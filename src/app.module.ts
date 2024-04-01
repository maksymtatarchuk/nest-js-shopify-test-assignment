import 'dotenv/config'
import { Module } from '@nestjs/common';
import { OrdersController } from './controllers/orders.controller';
import { OrderController } from './controllers/order.controller';
import { ShopifyService } from './services/shopify.service';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [],
  controllers: [OrdersController, OrderController, ProductController],
  providers: [ShopifyService],
})

export class AppModule { }
