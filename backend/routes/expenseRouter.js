import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { addExpenseC, getAllExpC } from "../controllers/expense.js";

const router = express.Router();

// add new expense.
router.post("/add", authMiddleware, addExpenseC);

// get all expense.
router.get("/all", authMiddleware, getAllExpC);

// // update one expense.
// router.post("/updateexpense/:id");

// // delete one expense.
// router.post("/deleteexpense/:id");

export default router;
