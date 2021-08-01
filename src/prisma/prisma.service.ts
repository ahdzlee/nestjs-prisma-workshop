import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // pass PrismaClientOptions eg., logging levels or error formatting
    super({ log: ['info'] });
  }
}
