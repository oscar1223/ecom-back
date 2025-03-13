import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiOperation({ summary: 'List all orders' })
  @ApiResponse({ status: 201, description: 'Orders listed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  @ApiOperation({ summary: 'Get order via id' })
  @ApiResponse({ status: 201, description: 'Order listed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update order' })
  @ApiResponse({ status: 201, description: 'Order updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @ApiOperation({ summary: 'Remove order' })
  @ApiResponse({ status: 201, description: 'Order removed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.remove(id);
  }
}
