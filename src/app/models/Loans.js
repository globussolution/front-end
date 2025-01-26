import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Wedding", "Home Construction", "Business Startup", "Education"],
    },
    subcategory: {
      type: String,
      required: true,
    },
    requestedAmount: {
      type: Number,
      required: true,
    },
    loanPeriod: {
      type: Number,
      required: true,
      enum: [3, 4, 5], // Years
    },
    guarantors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Guarantor",
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Loan = mongoose.models.Loan || mongoose.model("Loan", loanSchema);

export default Loan;
