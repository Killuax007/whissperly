import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { usernameValidator } from "@/Schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidator,
});

export async function GET(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const result = UsernameQuerySchema.safeParse(queryParam);
    console.log(result);
    if (!result.success) {
      const errors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message: errors.length > 0 ? errors.join(",") : "Invalid parameters",
        },
        { status: 500 }
      );
    }

    const { username } = result.data;
    const isExistingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (isExistingUser) {
      return Response.json(
        {
          success: false,
          message: "Username already taken ",
        },
        { status: 400 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error checking user name ", error);
    return Response.json(
      {
        success: false,
        message: "error while parsing username",
      },
      { status: 500 }
    );
  }
}
