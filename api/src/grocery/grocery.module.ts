import { Module } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GroceryController],
  providers: [GroceryService, PrismaService],
})
export class GroceryModule {}
