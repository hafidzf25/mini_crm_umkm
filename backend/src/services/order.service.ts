import { v4 as uuid } from "uuid";
import { Order, OrderItem } from "../types/index.js";
import {
    readDatabase,
    writeDatabase
} from "../utils/database.js";

export async function createOrder(
    customerId: string,
    items: OrderItem[],
    totalPrice: number
): Promise<Order> {
    const db = await readDatabase();

    const customerExists = db.customers.some(
        customer => customer.id === customerId
    );

    if (!customerExists) {
        throw new Error("Customer not found");
    }

    const order: Order = {
        id: uuid(),
        customer_id: customerId,
        items,
        total_price: totalPrice,
        created_at: new Date().toISOString()
    };

    db.orders.push(order);

    await writeDatabase(db);

    return order;
}

export async function getOrdersByCustomer(
    customerId: string
): Promise<Order[]> {
    const db = await readDatabase();

    const customerExists = db.customers.some(
        customer => customer.id === customerId
    );

    if (!customerExists) {
        throw new Error("Customer not found");
    }

    return db.orders.filter(
        order => order.customer_id === customerId
    );
}

export async function getAllOrders(): Promise<Order[]> {
    const db = await readDatabase();

    return db.orders;
}