import { Injectable } from '@nestjs/common';
import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ConnectionArgsDto } from '../page/connection-args.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prisma.product.findMany({ where: { published: true } });
  }

  findDrafts() {
    return this.prisma.product.findMany({ where: { published: false } });
  }

  async findPage(connectionArgs: ConnectionArgsDto) {
    const where: Prisma.ProductWhereInput = { published: true };

    return await findManyCursorConnection(
      // 👇 args contain take, skip and cursor
      (args) =>
        this.prisma.product.findMany({
          ...args, // 👈 apply paging arguments
          where,
        }),
      () =>
        this.prisma.product.count({
          where, // 👈 apply paging arguments
        }),
      connectionArgs, // 👈 use connection arguments
    );
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
