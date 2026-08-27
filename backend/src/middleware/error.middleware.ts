import {
    Request,
    Response,
    NextFunction
} from "express";

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(error);

    if (error.message === "Customer not found") {
        return res.status(404).json({
            success: false,
            message: error.message
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}