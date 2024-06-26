import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/CreateProduct.dto';
import { ShopifyService } from 'src/services/shopify.service';
import { CreateProductModel } from 'src/models/createProductModel';
import { ProductModel } from 'src/models/ProductModel';

@Controller('product')
export class ProductController {
    constructor(private shopifyService: ShopifyService) { }

    @Post(':platform')
    @HttpCode(200)
    @UsePipes(new ValidationPipe({
        whitelist: true,
        transform: true
    }))
    async createProduct(@Body() createProductDto: CreateProductDto) {
        let createProductModel = new CreateProductModel(createProductDto)
        let result = await this.shopifyService.createProductMock(createProductModel);

        return new ProductModel(result.product);
    }
}
