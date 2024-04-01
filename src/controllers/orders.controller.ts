import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ShopifyService } from 'src/services/shopify.service';
import { OrderModel } from 'src/models/OrderModel';


@Controller('orders')
export class OrdersController {
    constructor(private shopifyService: ShopifyService) { }

    @Get(':platform/')
    async getOrdersList(@Param('platform') platform: string): Promise<any> {
        let result: any[];

        switch (platform) {
            case 'shopify':
                let shopifyOrders = await this.shopifyService.getOrdersList();
                result = shopifyOrders.map((order: any) => new OrderModel(order));
                break

            default:
                return new BadRequestException('Service not found!');
        };

        return result
    }
}
