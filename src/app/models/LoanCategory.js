import mongoose from "mongoose";

const loanCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subcategories: [
      {
        name: { type: String, required: true },
        maxAmount: { type: Number, required: true },
        loanPeriod: { type: Number, required: true }, // Years
      },
    ],
  },
  { timestamps: true }
);

const LoanCategory =
  mongoose.models.LoanCategory ||
  mongoose.model("LoanCategory", loanCategorySchema);

export default LoanCategory;
