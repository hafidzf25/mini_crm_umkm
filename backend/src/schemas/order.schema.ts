import { z } from "zod";

export const createOrderSchema = z.object({
  customer_id: z
    .string()
    .min(1, "Customer ID is required"),

  items: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(1, "Item name is required"),

        quantity: z
          .number()
          .int()
          .positive(),

        price: z
          .number()
          .nonnegative()
      })
    )
    .min(1, "Order must contain at least one item"),

  total_price: z
    .number()
    .nonnegative()
});