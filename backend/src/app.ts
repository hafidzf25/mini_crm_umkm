import express from "express";
import cors from "cors";

import customerRoutes from "./routes/customer.route.js";
import orderRoutes from "./routes/order.route.js";

import {
    errorHandler
} from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Mini CRM API is running"
    });
});

app.use("/customers", customerRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});