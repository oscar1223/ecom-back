import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { OrderService } from './order.service';
  import { CreateOrderDto } from './dto/create-order.dto';
  import { UpdateOrderDto } from './dto/update-order.dto';
  import { Order } from '@prisma/client';
  
  @Controller('orders')
  export class OrderController {
    constructor(private readonly orderService: OrderService) {}
  
    @Post()
    create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
      return this.orderService.create(createOrderDto);
    }
  
    @Get()
    findAll(): Promise<Order[]> {
      return this.orderService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Order> {
      return this.orderService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateOrderDto: UpdateOrderDto,
    ): Promise<Order> {
      return this.orderService.update(id, updateOrderDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<Order> {
      return this.orderService.remove(id);
    }
  }
  