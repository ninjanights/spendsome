import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setLoading, setError, addExpense } from "../../store/expenseSlice.js";
import { addExpH } from "../../services/expense.js";

export const AddExpFrom = () => {
  const categories = [
    "Food",
    "Groceries",
    "Transport",
    "Fuel",
    "Shopping",
    "Entertainment",
    "Healthcare",
    "Medicine",
    "Education",
    "Bills",
    "Rent",
    "Utilities",
    "Internet",
    "Mobile Recharge",
    "Subscriptions",
    "Fitness",
    "Clothing",
    "Personal Care",
    "Gifts",
    "Travel",
    "Dining Out",
    "Coffee / Snacks",
    "Household Items",
    "Work-related",
    "Insurance",
    "Investments",
    "Bank Fees",
    "Repairs & Maintenance",
    "Pets",
    "Other",
  ];

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  // set up formik.
  const formik = useFormik({
    initialValues: {
      title: "",
      amount: "",
      category: "",
    },

    validationSchema: Yup.object({
      title: Yup.string().required("What was the event name?."),
      amount: Yup.number()
        .typeError("Ammount can't be text.")
        .required("Spend nothing then why you adding!")
        .positive("Amount needs to be positive."),
      category: Yup.string().required("Expense category is required."),
    }),

    onSubmit: async (values) => {
      dispatch(setLoading(true));

      const res = await addExpH(values);
      if (res.success) {
        dispatch(addExpense(res.data));
      } else {
        dispatch(setError(res.message));
      }

      dispatch(setLoading(false));
      formik.resetForm();
    },
  });

  const filtered =
    search.trim().length === 0
      ? categories
      : categories.filter((c) =>
          c.toLowerCase().includes(search.toLowerCase()),
        );

  const itemsPerPage = 5;
  const [page, setPage] = useState(0);
  const start = page * itemsPerPage;
  const currentItems =
    filtered.length > 0
      ? filtered.slice(start, start + itemsPerPage)
      : categories.slice(start, start + itemsPerPage);

  // handle set category.
  const handleSelect = (c) => {
    setSelectedCategory(c);
    formik.setFieldValue("category", c);
  };

  // next page.
  const nextPage = () => {
    if (start + itemsPerPage < categories?.length) {
      setPage(page + 1);
    }
  };

  // prev page.
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  // handle cancel selection.
  const handleCancelSelection = (e) => {
    e.preventDefault();
    setSelectedCategory("");
    setSearch("");

    formik.setFieldValue("category", "");
  };

  return (
    <div className="flex flex-col items-center rounded-b-2xl">
      <p className="my-6 text-2xl font-extrabold">Add expense.</p>

      {/* {formik?.errors && formik?.touched && <p>{formik?.errors}</p>} */}

      {/* title */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center justify-end gap-2">
              <label htmlFor="title" className="text-[12px] font-bold">
                Title
              </label>
              <div className="flex w-50 items-center justify-end gap-2">
                <div className="h-14 w-[1px] bg-neutral-600"></div>
                <input
                  className="text-small h-10 w-full border-b border-neutral-500 bg-transparent px-2 py-1 text-black outline-none select-none placeholder:text-[12px] focus:ring-0 focus:outline-none dark:text-neutral-300"
                  id="title"
                  type="text"
                  placeholder="Name your spending"
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                ></input>
              </div>
            </div>

            <div className="align-center flex items-center justify-end gap-2">
              {/* amount */}
              <label htmlFor="amount" className="text-[12px] font-bold">
                Amount
              </label>
              <div className="flex w-50 items-center justify-end gap-2">
                <div className="h-14 w-[1px] bg-neutral-600"></div>
                <input
                  id="amount"
                  type="number"
                  placeholder="How much?"
                  name="amount"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  className="no-spinner text-small h-10 w-full border-b border-neutral-500 bg-transparent px-2 py-1 text-black outline-none select-none placeholder:text-[12px] focus:ring-0 focus:outline-none dark:text-neutral-300"
                ></input>
              </div>
            </div>

            {/* category */}
            <div className="flex items-center justify-end gap-2">
              <label htmlFor="category" className="text-[12px] font-bold">
                Category
              </label>
              <div className="flex w-50 items-center justify-end gap-2">
                <div className="h-14 w-[1px] bg-neutral-600"></div>

                <input
                  className="no-spinner text-small h-10 w-full border-b border-neutral-500 bg-transparent px-2 py-1 text-black outline-none select-none placeholder:text-[12px] focus:ring-0 focus:outline-none dark:text-neutral-300"
                  id="category"
                  type="text"
                  value={selectedCategory ?? search}
                  placeholder="Category"
                  onChange={(e) => {
                    setSelectedCategory(null);
                    setPage(0);
                    setSearch(e.target.value);
                  }}
                ></input>
                <img
                  className="h-5"
                  onClick={(e) => handleCancelSelection(e)}
                  src="/cross.svg"
                ></img>
              </div>
            </div>
          </div>

          {/* slide */}
          <div className="flex w-full flex-col items-center justify-between gap-0.5 gap-4 text-[12px]">
            <div className="flex gap-1">
              {currentItems.map((c) => (
                <span
                  className={` ${
                    selectedCategory === c
                      ? "bg-blue-900 text-neutral-300 dark:bg-blue-900"
                      : "bg-neutral-400 dark:bg-neutral-700/40"
                  } rounded-3xl px-1.5 py-1 text-[10px]`}
                  key={c}
                  onClick={() => handleSelect(c)}
                >
                  {c}
                </span>
              ))}
            </div>

            <div className="flex w-full items-center justify-center gap-8 align-middle">
              <img
                onClick={prevPage}
                className="flex h-6 w-6 scale-x-[-1] transform items-center justify-center rounded-[50%] bg-neutral-700 p-1"
                src="/arrow.svg"
              ></img>
              <div className="flex gap-2">
                {`Page ${page + 1} of ${filtered.length !== 0 ? filtered.length : categories.length} items`}
              </div>
              <img
                onClick={nextPage}
                className="flex h-6 w-6 items-center justify-center rounded-[50%] bg-neutral-700 p-1"
                src="/arrow.svg"
              ></img>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="m-0 my-8 cursor-pointer rounded border-none bg-blue-900 p-0 px-3 py-2 font-bold text-neutral-300 outline-none hover:bg-blue-800 focus:outline-none"
        >
          Add
        </button>
      </form>
    </div>
  );
};
