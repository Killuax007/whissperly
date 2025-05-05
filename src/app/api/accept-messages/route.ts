import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "user not authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user?._id;
  const { acceptmessages } = await req.json();
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptmessages,
      },
      { new: true }
    );
    if (!updateUser) {
      return Response.json(
        {
          success: false,
          message: "failed to update ",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated",
        updateUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error whilte accepting messages", error);
    return Response.json(
      {
        success: false,
        message: "error whilte accepting messages",
      },
      { status: 404 }
    );
  }
}
export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!session || !session?.user) {
    return Response.json(
      {
        success: false,
        message: "user not authenticated",
      },
      { status: 401 }
    );
  }

  try {
    const foundUser = await UserModel.findById(user._id);

    if (!foundUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        isAcceptingMessage: foundUser.isAcceptingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving message acceptance status:", error);
    return Response.json(
      { success: false, message: "Error retrieving message acceptance status" },
      { status: 500 }
    );
  }
}
