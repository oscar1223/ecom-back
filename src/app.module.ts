import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/order/order.module';
import { CategoryModule } from './modules/category/category.module';
import { AddressModule } from './modules/address/address.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './modules/product/product.module';


@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProductModule,
    CategoryModule,
    AddressModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
