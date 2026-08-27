import { Router } from "express";

import {
    postOrder,
    getOrders
} from "../controllers/order.controller.js";

const router = Router();

router.post("/", postOrder);
router.get("/", getOrders);

export default router;