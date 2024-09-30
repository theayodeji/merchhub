import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/db/index"

export const POST = async (request) => {

    dbConnect()

  try {
    const { username, email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { status: 400 },
        { error: "User already exists" }
      );
    }

    const newUser = new User({ username, email, password });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    }, {status: 201});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
