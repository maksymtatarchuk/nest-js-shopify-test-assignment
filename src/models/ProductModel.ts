export class ProductModel {
    id: number;
    title: string;
    description: string;
    vendor: string;
    type: string;
    status: string;
    tags: string;
    createdAt: string;
    updatedAt: string;

    constructor(product: any) {
        this.id = product.id;
        this.type = product.product_type;
        this.status = product.status;
        this.tags = product.tags.split(', ');
        this.title = product.title;
        this.createdAt = product.created_at;
        this.updatedAt = product.updated_at;
        this.vendor = product.vendor;
    }

    getCreateProductModel(this: ProductModel) {
        return {
            product: {
                title: this.title,
                body_html: this.description,
                vendor: this.vendor,
                product_type: this.type,
                status: this.status
            }
        };
    }
}