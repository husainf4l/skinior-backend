import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvUploadService } from './csv-upload.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('csv-upload')
export class CsvUploadController {
  constructor(private readonly csvUploadService: CsvUploadService) {}

  @Post('products')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(new BadRequestException('Only CSV files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('CSV file is required!');
    }

    await this.csvUploadService.uploadProducts(file.path);
    return { message: 'Products uploaded successfully!' };
  }
}
