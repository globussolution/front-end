import mongoose from "mongoose";

const guarantorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
      minlength: 13,
      maxlength: 13,
    },
    phone: {
      type: String,
      required: true,
    },
    loanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
      required: true,
    },
  },
  { timestamps: true }
);

const Guarantor =
  mongoose.models.Guarantor || mongoose.model("Guarantor", guarantorSchema);

export default Guarantor;
