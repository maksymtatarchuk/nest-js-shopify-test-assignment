import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrdersController } from '../../src/controllers/orders.controller';
import { ShopifyService } from 'src/services/shopify.service';
import mockShopifyOrders from 'test/mocks/mockShopifyOrders';

const mockShopifyService = {
  getOrdersList: jest.fn().mockResolvedValueOnce(mockShopifyOrders.orders)
}

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{
        provide: ShopifyService,
        useValue: mockShopifyService
      }]
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should returns orders list', async () => {
    const result = await controller.getOrdersList('shopify')
    expect(Array.isArray(result));
    expect(result.length === 3);
    expect(result.map((resultItem: any) => {
      Object.keys(resultItem).includes('id')
        && Object.keys(resultItem).includes('name')
        && Object.keys(resultItem).includes('priceDetails')
        && Object.keys(resultItem).includes('items') && Array.isArray(resultItem.items)
    }))
  })

  it('if platform parameter is wrong should returns error', async () => {
    expect(await controller.getOrdersList('sshopify')).toEqual(new BadRequestException('Service not found!'))
  })

});
