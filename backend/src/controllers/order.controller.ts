import {
    Request,
    Response,
    NextFunction
} from "express";

import {
    createOrder,
    getOrdersByCustomer,
    getAllOrders
} from "../services/order.service.js";

import {
    createOrderSchema
} from "../schemas/order.schema.js";

export async function postOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const result =
            createOrderSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: result.error.flatten()
            });
        }

        const order = await createOrder(
            result.data.customer_id,
            result.data.items,
            result.data.total_price
        );

        return res.status(201).json({
            success: true,
            data: order
        });
    } catch (error) {
        next(error);
    }
}

export async function getOrders(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const customerId = req.query.customer_id;

        if (customerId !== undefined) {
            if (typeof customerId !== "string") {
                return res.status(400).json({
                    success: false,
                    message: "Invalid customer_id"
                });
            }

            const orders =
                await getOrdersByCustomer(customerId);

            return res.status(200).json({
                success: true,
                data: orders
            });
        }

        const orders = await getAllOrders();

        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        next(error);
    }
}