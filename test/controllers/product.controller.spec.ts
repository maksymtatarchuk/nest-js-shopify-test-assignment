import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../../src/controllers/product.controller';
import { ShopifyService } from 'src/services/shopify.service';

const mockCreateProductDto = {
  "title": "Dumbbells",
  "description": "30kg dumbbells best quality black",
  "vendor": "Super sport equipment Inc",
  "type": "dumbbell"
}

const mockCreateProductResult = {
  "id": 6914491809925,
  "type": "dumbbell",
  "status": "active",
  "tags": [
    "Sport",
    "Active",
    "Fitness"
  ],
  "title": "Best dumbbell",
  "createdAt": "2024-01-02T08:59:11-05:00",
  "updatedAt": "2024-03-28T09:39:23-04:00",
  "vendor": "Super sport equipment Inc"
}

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ShopifyService]
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should returns orders list', async () => {
    expect(await controller.createProduct(mockCreateProductDto)).toEqual(mockCreateProductResult)
  })
});
