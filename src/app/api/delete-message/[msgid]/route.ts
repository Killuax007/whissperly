import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ msgid: string }> }
) {
  const msgid = (await params).msgid;
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
    const updateResults = await UserModel.updateOne(
      {
        _id: user._id,
      },
      { $pull: { messages: { _id: msgid } } }
    );
    if (updateResults.modifiedCount == 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message successfully deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong while deleting",
      },
      { status: 500 }
    );
  }
}
