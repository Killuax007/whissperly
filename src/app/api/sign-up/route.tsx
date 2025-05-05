import sendEmail from "@/helpers/sendEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, password, email } = await request.json();

    //! check whether the username is exist or not
    const existingUserByName = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserByName) {
      return Response.json(
        {
          success: false,
          message: "User name already taken...",
        },
        { status: 400 }
      );
    }

    // Otp and the expiration time of the otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //! check user by Email address
    const existingUserByEmail = await UserModel.findOne({
      email,
    });
    if (existingUserByEmail) {
      if (!existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email already exists...",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.otp = otp;
        existingUserByEmail.expireOtp = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const curDate = new Date();
        curDate.setHours(curDate.getHours() + 1);

        const newUser = new UserModel({
          username,
          password: hashedPassword,
          email,
          otp,
          expireOtp: curDate,
          messages: [],
        });
        await newUser.save();
      } catch (error) {
        return Response.json(
          {
            success: false,
            message: `Error while Signing up user: ${error}`,
          },
          { status: 500 }
        );
      }
    }
    // send verification email notification
    console.log(username, email, otp);
    const getEmailResponse = await sendEmail(username, email, otp);
    if (!getEmailResponse.success) {
      return Response.json(
        {
          success: false,
          message: "Error while sending email and otp...",
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "User registered successfully... Please verify your account ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error ...", error);
    return Response.json(
      {
        success: false,
        message: "Error while creating user...",
      },
      { status: 401 }
    );
  }
}
