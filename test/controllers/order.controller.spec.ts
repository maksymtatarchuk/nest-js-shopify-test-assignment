import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrderController } from '../../src/controllers/order.controller';
import { ShopifyService } from 'src/services/shopify.service';
import mockShopifyOrder from 'test/mocks/mockShopifyOrder';

const mockShopifyService = {
  getOrderByID: jest.fn().mockResolvedValueOnce(mockShopifyOrder.order)
}

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{
        provide: ShopifyService,
        useValue: mockShopifyService
      }]
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should returns orders list', async () => {
    const result = await controller.getOrder('shopify', '4985632194693')
    expect(Array.isArray(result));
    expect(result.length === 3);
    expect(Object.keys(result).includes('id')
      && Object.keys(result).includes('name')
      && Object.keys(result).includes('priceDetails')
      && Object.keys(result).includes('items')
      && Array.isArray(result.items)
    )
  })

  it('if platform parameter is wrong should returns error', async () => {
    expect(await controller.getOrder('sshopify', '4985632194693')).toEqual(new BadRequestException('Service not found!'))
  })

});
