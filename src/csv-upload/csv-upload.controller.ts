import { Controller, Post, Body } from '@nestjs/common';
import { CsvUploadService } from './csv-upload.service';

@Controller('csv-upload')
export class CsvUploadController {
  constructor(private readonly csvUploadService: CsvUploadService) {}

  @Post()
  async uploadProducts(@Body('filePath') filePath: string): Promise<void> {
    // Trigger the CSV upload process
    await this.csvUploadService.uploadCsv(filePath);
  }
}
