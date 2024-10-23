import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as csv from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class CsvUploadService {
  constructor(private prisma: PrismaService) {}

  async uploadProducts(filePath: string): Promise<void> {
    const products = [];

    // Read and parse the CSV file
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => products.push(data))
        .on('end', async () => {
          try {
            for (const product of products) {
              const { name, descriptionAr, descriptionEn, image, categoryId, price, discountedPrice,handle, items } = product;

              // Create the product
              const createdProduct = await this.prisma.product.create({
                data: {
                  name,
                  descriptionAr,
                  descriptionEn,
                  image,
                  categoryId: Number(categoryId),
                  price: parseFloat(price),
                  discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
                  handle

                },
              });

              // If product items are provided, create them
              if (items) {
                const productItems = JSON.parse(items); // Expecting `items` to be JSON formatted in CSV

                for (const item of productItems) {
                  await this.prisma.variant.create({
                    data: {
                      name:createdProduct.name,
                      productId: createdProduct.id,
                      sku: item.sku,
                    },
                  });
                }
              }
            }
            resolve();
          } catch (error) {
            reject(new BadRequestException('CSV upload failed: ' + error.message));
          }
        });
    });
  }
}
