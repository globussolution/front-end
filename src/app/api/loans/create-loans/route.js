import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Loan from "@/models/Loan";
import { validateLoan } from "@/utils/validations/loanValidation";
import authMiddleware from "@/lib/authMiddleware";

export async function POST(req) {
  try {
    const { user } = await authMiddleware(req); // Ensure user is authenticated
    const { category, subcategory, requestedAmount, loanPeriod } =
      await req.json();

    // Validate loan input
    const { error } = validateLoan({
      category,
      subcategory,
      requestedAmount,
      loanPeriod,
    });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    await connectDB();

    const loan = new Loan({
      userId: user.id,
      category,
      subcategory,
      requestedAmount,
      loanPeriod,
      status: "pending",
    });
    await loan.save();

    return NextResponse.json({
      message: "Loan application submitted successfully",
      loan,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
