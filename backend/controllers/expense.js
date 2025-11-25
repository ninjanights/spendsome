import Expense from "../models/expense.js";
import User from "../models/user.js";

// get all exps.
export const getAllExpC = async (req, res) => {
  try {
    const userId = req.user?.sub;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "To see your base, log in.",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No logged in user.",
      });
    }

    const exps = await Expense.findOne({ user: user._id });
    console.log(exps, "exps");

    return res.status(200).json({
      success: true,
      data: exps,
      message: "There's the money went.",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message || "Error in getting all expense entries.",
    });
  }
};

// add 1 exp.
export const addExpenseC = async (req, res) => {
  try {
    const userId = await req.user.sub;
    console.log(userId, "🎏");

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "To drop the asset, login.",
      });
    }

    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "Some data you may haven't sent.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No logged in user.",
      });
    }

    const newExpense = {
      user: user._id,
      title,
      amount,
      category,
      date: date,
    };

    const addExp = await Expense.create(newExpense);

    res.status(201).json({
      success: true,
      message: "Yeah you added a new entry.",
      data: addExp,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e.message || "Error in adding a new expense entry.",
    });
  }
};
