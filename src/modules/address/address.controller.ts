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
  import { AddressService } from './address.service';
  import { CreateAddressDto } from './dto/create-address.dto';
  import { UpdateAddressDto } from './dto/update-address.dto';
  import { Address } from '@prisma/client';
  
  @Controller('addresses')
  export class AddressController {
    constructor(private readonly addressService: AddressService) {}
  
    /**
     * Crea una dirección
     */
    @Post()
    create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
      return this.addressService.create(createAddressDto);
    }
  
    /**
     * Lista todas las direcciones
     */
    @Get()
    findAll(): Promise<Address[]> {
      return this.addressService.findAll();
    }
  
    /**
     * Retorna una dirección específica por ID
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Address> {
      return this.addressService.findOne(id);
    }
  
    /**
     * Actualiza una dirección
     */
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateAddressDto: UpdateAddressDto,
    ): Promise<Address> {
      return this.addressService.update(id, updateAddressDto);
    }
  
    /**
     * Elimina una dirección
     */
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<Address> {
      return this.addressService.remove(id);
    }
  }
  