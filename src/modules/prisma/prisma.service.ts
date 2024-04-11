import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  prisma: PrismaClient
  constructor() {
    super()
    this.prisma = new PrismaClient()
  }
  async onModuleInit() {
    await this.$connect();
  }
}