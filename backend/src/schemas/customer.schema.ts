import { z } from "zod";

export const createCustomerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must contain at least 2 characters"),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    phone: z
        .string()
        .trim()
        .regex(
            /^[0-9]+$/,
            "Phone number must contain only numbers"
        )
        .min(8, "Phone number must contain at least 8 characters")
});