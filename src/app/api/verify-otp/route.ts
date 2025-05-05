import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, otp } = await request.json();
    const decodedName = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedName });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found ",
        },
        { status: 500 }
      );
    }
    const isOtpValid = user.otp === otp;
    const isOtpNotExpired = new Date(user.expireOtp) > new Date();
    if (isOtpValid && isOtpNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        { success: true, message: "Account verified successfully" },
        { status: 200 }
      );
    } else if (!isOtpNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Otp expired .. try to Signup to gat a new one ",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("error verifying code", error);
    return Response.json(
      {
        success: false,
        message: "Error while verifying code ",
      },
      { status: 500 }
    );
  }
}
