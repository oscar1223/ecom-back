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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Addresses')  
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  /**
   * Crea una dirección
   */
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Create a new Address' })
  @ApiResponse({ status: 201, description: 'Address created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  /**
   * Lista todas las direcciones
   */
  @UseGuards(JwtAuthGuard)
  @Get('list')
  @ApiOperation({ summary: 'List all addresses' })
  @ApiResponse({ status: 201, description: 'Addresses listed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  /**
   * Retorna una dirección específica por ID
   */
  @UseGuards(JwtAuthGuard)
  @Get('get/:id')
  @ApiOperation({ summary: 'List one address' })
  @ApiResponse({ status: 201, description: 'Address listed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Address> {
    return this.addressService.findOne(id);
  }

  /**
   * Actualiza una dirección
   */
  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  @ApiOperation({ summary: 'Update address' })
  @ApiResponse({ status: 201, description: 'Address updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  /**
   * Elimina una dirección
   */
  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  @ApiOperation({ summary: 'Remove address' })
  @ApiResponse({ status: 201, description: 'Address removed successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<Address> {
    return this.addressService.remove(id);
  }
}
