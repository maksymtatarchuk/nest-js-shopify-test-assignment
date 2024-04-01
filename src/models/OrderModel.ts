export class OrderModel {
    id: string;
    name: string;
    line_items: string[];
    priceDetails: {
        shopPrice: {
            amount: number,
            currency: string
        },
        presentmentPrice: {
            amount: number,
            currency: string
        }
    };

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name.replace('#', '');
        this.line_items = this.parseLineItems(data.line_items);
        this.priceDetails = this.getPriceDetails(this.line_items);
    }

    parseLineItems(lineItems: any) {
        let parsedLineItems = [];

        interface itemProps {
            quantity: number;
            id: string;
            title: string;
            grams: number;
            price_set: {
                shop_money: {
                    amount: any;
                    currency_code: string;
                };
                presentment_money: {
                    amount: any;
                    currency_code: string;
                };
            };
            product_id: string;
            sku: string;
            variant_id: string;
            total_discount_set: {
                shop_money: {
                    amount: any;
                    currency_code: string;
                };
                presentment_money: {
                    amount: any;
                    currency_code: string;
                };
            };
        }

        lineItems.forEach((item: itemProps) => {
            let productsQuantity = item.quantity;

            while (productsQuantity > 0) {
                productsQuantity--;

                parsedLineItems.push({
                    id: item.id,
                    name: item.title,
                    weight: Number(item.grams) / 1000,
                    weightUnit: 'KG',
                    priceDetails: {
                        shopPrice: {
                            amount: Number(item.price_set.shop_money.amount),
                            currency: item.price_set.shop_money.currency_code
                        },
                        presentmentPrice: {
                            amount: Number(item.price_set.presentment_money.amount),
                            currency: item.price_set.presentment_money.currency_code
                        }
                    },
                    productId: item.product_id,
                    quantity: 1,
                    sku: item.sku,
                    varinatId: item.variant_id,
                    tax: {
                        shopPrice: {
                            amount: Number(item.total_discount_set.shop_money.amount),
                            currency: item.price_set.shop_money.currency_code
                        },
                        presentmentPrice: {
                            amount: Number(item.total_discount_set.presentment_money.amount),
                            currency: item.total_discount_set.presentment_money.currency_code
                        }

                    }
                })
            }
        })

        return parsedLineItems;
    }

    getPriceDetails(line_items: any[]) {
        let currency: string = '';
        let shopPrice: number = 0;
        let presentmentPrice: number = 0;

        line_items.forEach(item => {
            shopPrice += item.priceDetails.shopPrice.amount;
            presentmentPrice += item.priceDetails.presentmentPrice.amount;

            if (!currency) {
                currency = item.priceDetails.shopPrice.currency || item.priceDetails.presentmentPrice.currency;
            }
        })

        return {
            shopPrice: {
                amount: shopPrice,
                currency: currency
            },
            presentmentPrice: {
                amount: presentmentPrice,
                currency: currency
            }
        }
    }

    lineItemPriceDetails() { }
}