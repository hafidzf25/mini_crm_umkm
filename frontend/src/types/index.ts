export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    created_at: string;
}

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customer_id: string;
    items: OrderItem[];
    total_price: number;
    created_at: string;
}

export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    customer_id: string;
    items: OrderItem[];
    total_price: number;
    created_at: string;
}