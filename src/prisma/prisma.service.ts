import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as process from 'node:process';

interface PrismaModel {
  deleteMany: (args?: unknown) => Promise<unknown>;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL || '',
    });

    super({
      adapter,
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    console.log('Database connected successfully!');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
    console.log('Database disconnected successfully!');
  }

  async cleanDatabase(): Promise<void> {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production mode');
    }

    const propertyNames = Object.getOwnPropertyNames(this);

    const modelKeys = propertyNames.filter(
      (key) => !key.startsWith('_') && !key.startsWith('$'),
    );

    await Promise.all(
      modelKeys.map(async (modelKey) => {
        const model = (this as unknown as Record<string, PrismaModel>)[
          modelKey
        ];

        if (model && typeof model.deleteMany === 'function') {
          return model.deleteMany();
        }
        return Promise.resolve();
      }),
    );
  }
}
