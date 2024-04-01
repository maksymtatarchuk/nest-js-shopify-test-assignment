import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { ShopifyService } from 'src/services/shopify.service';
import { OrderModel } from 'src/models/OrderModel';


@Controller('order')
export class OrderController {
    constructor(private shopifyService: ShopifyService) { }

    @Get(':platform/:id')
    async getOrder(@Param('platform') platform: string, @Param('id') id: string): Promise<any> {
        let result: any;

        switch (platform) {
            case 'shopify':
                let shopifyOrder = await this.shopifyService.getOrderByID(id);
                result = JSON.stringify(new OrderModel(shopifyOrder));
                break;

            default:
                return new BadRequestException('Service not found!');
        };

        return result;
    }
}
