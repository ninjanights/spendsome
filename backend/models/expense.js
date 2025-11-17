import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a Title."],
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount."],
    },
    category: {
      type: String,
      enum: ["Food", "Transport", "Shopping", "Bills", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
