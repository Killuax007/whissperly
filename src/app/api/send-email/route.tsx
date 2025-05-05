import VerificationEmailTemplate from "@/EmailTemplates/verificationEmail";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, otp, email } = body;
  const emailHtml = VerificationEmailTemplate(username, otp);
  if (!username || !otp || !email) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `" Whissperly " <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Whissperly, Verification Code",
      text: "Otp sent successfully",
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({
      success: true,
      message: "Otp sent successfully..",
    });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({ message: "Failed to send email" }, { status: 500 });
  }
}
