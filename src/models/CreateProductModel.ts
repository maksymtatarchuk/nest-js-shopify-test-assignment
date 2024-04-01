import { CreateProductDto } from "src/dtos/CreateProduct.dto";

export class CreateProductModel {
    title: string;
    description: string;
    vendor: string;
    type: string;
    status: string;

    constructor(product: CreateProductDto) {
        this.title = product.title;
        this.description = product.description;
        this.vendor = product.vendor;
        this.type = product.type;
        this.status = 'active'
    }

    setStatusActive(this: CreateProductModel) {
        this.status = 'active';
        return this;
    }

    setStatusArchived(this: CreateProductModel) {
        this.status = 'archived';
    }

    setStatusDraft(this: CreateProductModel) {
        this.status = 'draft';
    }
}