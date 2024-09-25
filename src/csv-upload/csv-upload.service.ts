import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import * as fs from 'fs';
import * as csv from 'csv-parser';

@Injectable()
export class CsvUploadService {
  constructor(private prisma: PrismaService) {}

  async uploadCsv(filePath: string) {
    const parser = fs.createReadStream(filePath).pipe(csv({
      separator: ';' // ensure correct CSV delimiter is set
    }));

    parser.on('data', async (row) => {
      try {
        const {
          handle,
          name,
          description,
          price,
          brand,
          isFeatured,
          categoryId,
          tags,
          imageUrls,
          imageAltTexts,
          relatedProductHandles
        } = row;

        // Parse related fields
        const parsedPrice = parseFloat(price);
        const isFeaturedBoolean = isFeatured.toLowerCase() === 'true';
        const categoryIdInt = parseInt(categoryId, 10);
        const imageUrlsArray = imageUrls.split(',');
        const imageAltTextsArray = imageAltTexts.split(',');
        
        // Create product
        const product = await this.prisma.product.create({
          data: {
            handle,
            name,
            description,
            price: parsedPrice,
            brand,
            isFeatured: isFeaturedBoolean,
            categoryId: categoryIdInt,
            images: {
              create: imageUrlsArray.map((url, index) => ({
                url: url.trim(),
                altText: imageAltTextsArray[index]?.trim(),
              })),
            },
            // Handling tags if available (optional)
            ...(tags && {
              tags: {
                connectOrCreate: tags.split(',').map((tag) => ({
                  where: { name: tag.trim() },
                  create: { name: tag.trim() },
                })),
              },
            }),
            // Handling related products (optional)
            ...(relatedProductHandles && {
              relatedProducts: {
                connect: relatedProductHandles.split(',').map((handle) => ({
                  handle: handle.trim(),
                })),
              },
            }),
          },
        });

        console.log(`Product ${product.name} created successfully!`);
      } catch (error) {
        console.error(`Error creating product:`, error.message);
      }
    });

    parser.on('end', () => {
      console.log('CSV file successfully processed.');
    });
  }
}
