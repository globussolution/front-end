import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Loan from "@/models/Loan";
import authMiddleware from "@/lib/authMiddleware";

export async function GET(req) {
  try {
    const { user } = await authMiddleware(req, "admin"); // Ensure admin role
    await connectDB();

    const totalLoans = await Loan.countDocuments();
    const approvedLoans = await Loan.countDocuments({ status: "approved" });
    const rejectedLoans = await Loan.countDocuments({ status: "rejected" });

    return NextResponse.json({
      totalLoans,
      approvedLoans,
      rejectedLoans,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
