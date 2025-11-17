import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/mongoDB.js";

import authRouter from "./routes/authRouter.js";
import expenseRouter from "./routes/expenseRouter.js";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// routes
app.use("/api/auth", authRouter);
app.use("/api/expenses", expenseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server live at ${PORT}.`);
});
