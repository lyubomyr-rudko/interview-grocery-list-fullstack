import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FilterGroceryDto } from './dto/filter.dto';
import { CreateGroceryDto, UpdateGroceryDto } from './dto/grocery.dto';

@Injectable()
export class GroceryService {
  constructor(private prisma: PrismaService) {}

  async filterGroceries(filter: FilterGroceryDto, userId: string) {
    /**
     * @todo add pagination
     */
    const where = {
      userId,
      ...filter,
    };

    const groceries = await this.prisma.groceryItem.findMany({
      where,
      orderBy: [{ priority: 'asc' }, { name: 'asc' }],
    });

    return groceries;
  }

  async createGrocery(createGroceryDto: CreateGroceryDto, userId: string) {
    return this.prisma.groceryItem.create({
      data: { ...createGroceryDto, userId },
    });
  }

  async updateGrocery(
    id: string,
    updateGroceryDto: UpdateGroceryDto,
    userId: string,
  ) {
    return this.prisma.groceryItem.update({
      where: { id, userId },
      data: updateGroceryDto,
    });
  }

  async deleteGrocery(id: string, userId: string) {
    return this.prisma.groceryItem.delete({
      where: { id, userId },
    });
  }
}
