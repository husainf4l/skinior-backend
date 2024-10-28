import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BannerService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return this.prisma.banner.findMany({
            orderBy:{id:"desc"}
        });
      }

}
