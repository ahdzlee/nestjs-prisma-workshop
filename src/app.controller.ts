import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products')
  @ApiOperation({ summary: 'Find all published products' })
  @ApiResponse({ status: 200, description: 'Successful' })
  findPublishedProducts() {
    return this.prisma.product.findMany({
      where: { published: true },
    });
  }
}
