import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import User from "@/models/User";
import { validateRegister } from "@/utils/validations/authValidation";

export async function POST(req) {
  try {
    const { name, email, cnic } = await req.json();

    // Validate input
    const { error } = validateRegister({ name, email, cnic });
    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );

    // Register user
    const user = new User({
      name,
      email,
      cnic,
      role: "user", // default role
    });
    await user.save();

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
