import { Router } from "express";

import {
    postCustomer,
    getAllCustomers
} from "../controllers/customer.controller.js";

const router = Router();

router.post("/", postCustomer);
router.get("/", getAllCustomers);

export default router;