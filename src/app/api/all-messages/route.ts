import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function GET() {
  await dbConnect();

  try {
    const messages = await UserModel.aggregate([
      { $unwind: "$messages" },
      {
        $project: {
          _id: 0,
          username: 1,
          message: "$messages",
        },
      },
    ]);

    if (!messages) {
      return Response.json(
        {
          success: false,
          message: "User not found ",
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        messages: messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error whilte accepting messages", error);
    return Response.json(
      {
        success: false,
        message: "Error whilte accepting messages",
      },
      { status: 404 }
    );
  }
}
