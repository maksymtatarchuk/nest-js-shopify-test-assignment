import { BadRequestException, Injectable } from '@nestjs/common';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + Buffer.from(process.env.API_KEY + ':' + process.env.PASSWORD).toString('base64'));
headers.append('Content-Type', 'application/json')

@Injectable()
export class ShopifyService {

    async getOrderByID(id: string): Promise<any> {
        const url: string = `https://nitzan-test2.myshopify.com/admin/api/2023-04/orders/${id}.json?fields=id%2Cname%2Cline_items`;
        const requestOptions: any = {
            method: 'GET',
            headers: headers,
            redirect: "follow"
        };

        const result = await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                if (Object.keys(result).includes('errors')) {
                    return new BadRequestException(result);
                }

                return result.order
            }).catch((error) => {
                throw new Error(error)
            })

        return result;
    }

    async getOrdersList(): Promise<any> {
        const url: string = `https://nitzan-test2.myshopify.com/admin/api/2024-04/orders.json?status=any`;
        const requestOptions: any = {
            method: 'GET',
            headers: headers,
            redirect: "follow"
        };

        const result = await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                if (Object.keys(result).includes('errors')) {
                    return new BadRequestException(result);
                }

                return result.orders
            }).catch((error) => {
                throw new Error(error)
            })

        return result;
    }


    async createProduct(product: any) {
        const requestOptions: any = {
            method: 'POST',
            headers: headers,
            redirect: "follow",
            body: JSON.stringify(product.getCreateProductModel())
        };

        const url = 'https://nitzan-test2.myshopify.com/admin/api/2023-04/products.json'

        const result = await fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {

                if (Object.keys(result).includes('errors')) {
                    return new BadRequestException(result);
                }

                return result;
            }).catch((error) => {
                throw new Error(error)
            })

        return result;
    }

    async createProductMock(product: any) {
        return {
            "product": {
                "id": 6914491809925,
                "title": "Best dumbbell",
                "body_html": product.description,
                "vendor": product.vendor,
                "product_type": product.type,
                "created_at": "2024-01-02T08:59:11-05:00",
                "handle": "burton-custom-freestyle-151",
                "updated_at": "2024-03-28T09:39:23-04:00",
                "published_at": null,
                "template_suffix": null,
                "published_scope": "web",
                "tags": "Sport, Active, Fitness",
                "status": product.status,
                "admin_graphql_api_id": "gid://shopify/Product/1072481100",
                "variants": [
                    {
                        "id": 1070325098,
                        "product_id": 1072481100,
                        "title": "Default Title",
                        "price": "0.00",
                        "sku": "",
                        "position": 1,
                        "inventory_policy": "deny",
                        "compare_at_price": null,
                        "fulfillment_service": "manual",
                        "inventory_management": null,
                        "option1": "Default Title",
                        "option2": null,
                        "option3": null,
                        "created_at": "2024-03-28T09:39:22-04:00",
                        "updated_at": "2024-03-28T09:39:22-04:00",
                        "taxable": true,
                        "barcode": null,
                        "grams": 0,
                        "weight": 0,
                        "weight_unit": "lb",
                        "inventory_item_id": 1070325098,
                        "inventory_quantity": 0,
                        "old_inventory_quantity": 0,
                        "presentment_prices": [
                            {
                                "price": {
                                    "amount": "0.00",
                                    "currency_code": "USD"
                                },
                                "compare_at_price": null
                            }
                        ],
                        "requires_shipping": true,
                        "admin_graphql_api_id": "gid://shopify/ProductVariant/1070325098",
                        "image_id": null
                    }
                ],
                "options": [
                    {
                        "id": 1064576585,
                        "product_id": 1072481100,
                        "name": "Title",
                        "position": 1,
                        "values": [
                            "Default Title"
                        ]
                    }
                ],
                "images": [],
                "image": null
            }
        }
    }

}
