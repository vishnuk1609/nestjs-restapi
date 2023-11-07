export interface IAddProduct {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
}

export interface IEditProduct {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    stock?: number;
}
