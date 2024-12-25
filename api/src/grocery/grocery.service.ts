import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FilterGroceryDto } from './dto/filter.dto'
import { CreateGroceryDto, UpdateGroceryDto } from './dto/grocery.dto'

@Injectable()
export class GroceryService {
  constructor(private prisma: PrismaService) {}

  async filterGroceries(filterWithPagination: FilterGroceryDto, userId: string) {
    const { take = 10, skip = 0, ...filter } = filterWithPagination

    const where = {
      userId,
      ...filter,
    }

    const groceries = await this.prisma.groceryItem.findMany({
      where,
      orderBy: [{ priority: 'asc' }, { name: 'asc' }],
      take,
      skip,
    })

    const total = await this.prisma.groceryItem.count({ where })

    return [groceries, total]
  }

  async createGrocery(createGroceryDto: CreateGroceryDto, userId: string) {
    return this.prisma.groceryItem.create({
      data: { ...createGroceryDto, userId },
    })
  }

  async updateGrocery(id: string, updateGroceryDto: UpdateGroceryDto, userId: string) {
    const result = await this.prisma.groceryItem.update({
      where: { id, userId },
      data: updateGroceryDto,
    })

    await this.prisma.groceryItemHistory.create({
      data: {
        status: result.status,
        groceryItemId: id,
      },
    })

    return result
  }

  async getGroceryItem(id: string, userId: string) {
    return this.prisma.groceryItem.findFirst({
      where: { id, userId },
      include: {
        history: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })
  }

  async deleteGrocery(id: string, userId: string) {
    return this.prisma.groceryItem.delete({
      where: { id, userId },
    })
  }
}
