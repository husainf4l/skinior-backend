import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { connect } from 'http2';

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
              const { name,line, shortName, descriptionAr, descriptionEn, image, categoryHandle, price, discountedPrice,handle, brand,metaKeywords,metaDescription,metaTitle  } = product;

              
              const createdProduct = await this.prisma.product.create({
                data: {
                  name,
                  line,
                  shortName,
                  descriptionAr,
                  descriptionEn,
                  image,
                  category: {
                    connect: {
                      handle: categoryHandle, 
                    },
                  },            
                        price: parseFloat(price),
                  discountedPrice: discountedPrice ? parseFloat(discountedPrice) : null,
                  handle,
                  brand,
                  metaKeywords,
                  metaDescription,
                  metaTitle,
                  
                },
              });
            }
            resolve();
          } catch (error) {
            reject(new BadRequestException('CSV upload failed: ' + error.message));
            console.log(error)
          }
        });
    });
  }



  
}
