import {
    Request,
    Response,
    NextFunction
} from "express";

import {
    createCustomer,
    getCustomers
} from "../services/customer.service.js";

import {
    createCustomerSchema
} from "../schemas/customer.schema.js";

export async function postCustomer(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result =
            createCustomerSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: result.error.flatten()
            });
        }

        const customer = await createCustomer(
            result.data.name,
            result.data.email,
            result.data.phone
        );

        return res.status(201).json({
            success: true,
            data: customer
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllCustomers(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const customers = await getCustomers();

        return res.status(200).json({
            success: true,
            data: customers
        });
    } catch (error) {
        next(error);
    }
}