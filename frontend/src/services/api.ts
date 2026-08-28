import type {
    Customer,
    Order
} from "../types";

const API_URL = "http://localhost:3000";

export async function getCustomers(): Promise<Customer[]> {
    const response = await fetch(
        `${API_URL}/customers`
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch customers"
        );
    }

    const result = await response.json();

    return result.data;
}

export async function createCustomer(
    data: {
        name: string;
        email: string;
        phone: string;
    }
): Promise<Customer> {
    const response = await fetch(
        `${API_URL}/customers`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to create customer"
        );
    }

    return result.data;
}

export async function createOrder(
    data: {
        customer_id: string;
        items: {
            name: string;
            quantity: number;
            price: number;
        }[];
        total_price: number;
    }
): Promise<Order> {
    const response = await fetch(
        `${API_URL}/orders`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "Failed to create order"
        );
    }

    return result.data;
}

export async function getOrders(
    customerId?: string
): Promise<Order[]> {
    const url = customerId
        ? `${API_URL}/orders?customer_id=${customerId}`
        : `${API_URL}/orders`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Failed to fetch orders"
        );
    }

    const result = await response.json();

    return result.data;
}