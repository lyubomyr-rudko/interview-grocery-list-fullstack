import { Request } from 'express';
import { JwtAuthGuard } from 'src/authentication/auth.guard';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { FilterGroceryDto } from './dto/filter.dto';
import {
  CreateGroceryDto,
  GroceryItemIdDto,
  UpdateGroceryDto,
} from './dto/grocery.dto';

type RequestWithUser = Request & { user: { id: string } };

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async filterGroceries(
    @Query() filter: FilterGroceryDto,
    @Req() request: RequestWithUser,
  ) {
    const userId = request?.user?.id;
    const [data, total] = await this.groceryService.filterGroceries(
      filter,
      userId,
    );

    return {
      data,
      total,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createGrocery(
    @Body() createGroceryDto: CreateGroceryDto,
    @Req() request: RequestWithUser,
  ) {
    const userId = request?.user?.id;
    const data = await this.groceryService.createGrocery(
      createGroceryDto,
      userId,
    );

    return {
      data,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateGrocery(
    @Param() { id }: GroceryItemIdDto,
    @Body() updateGroceryDto: UpdateGroceryDto,
    @Req() request: RequestWithUser,
  ) {
    const userId = request?.user?.id;
    const data = await this.groceryService.updateGrocery(
      id,
      updateGroceryDto,
      userId,
    );

    return {
      data,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteGrocery(
    @Param() { id }: GroceryItemIdDto,
    @Req() request: RequestWithUser,
  ) {
    const userId = request?.user?.id;
    const data = await this.groceryService.deleteGrocery(id, userId);

    return {
      data,
    };
  }
}
