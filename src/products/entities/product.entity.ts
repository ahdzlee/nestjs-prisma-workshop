import { Prisma, Product } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity implements Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  price: Prisma.Decimal;

  @ApiProperty()
  sku: string;

  @ApiProperty({ default: false })
  published: boolean;
}
