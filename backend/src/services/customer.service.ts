import { v4 as uuid } from "uuid";
import { Customer } from "../types/index.js";
import {
    readDatabase,
    writeDatabase
} from "../utils/database.js";

export async function createCustomer(
    name: string,
    email: string,
    phone: string
): Promise<Customer> {
    const db = await readDatabase();

    const customer: Customer = {
        id: uuid(),
        name,
        email,
        phone,
        created_at: new Date().toISOString()
    };

    db.customers.push(customer);

    await writeDatabase(db);

    return customer;
}

export async function getCustomers(): Promise<Customer[]> {
    const db = await readDatabase();

    return db.customers;
}