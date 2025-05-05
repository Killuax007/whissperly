import VerificationEmailTemplate from "@/EmailTemplates/verificationEmail";
import { ApiRespopnse } from "@/types/APiResponse";
import { transporter } from "@/lib/transporter";

export default async function sendEmail(
  username: string,
  email: string,
  otp: string
): Promise<ApiRespopnse> {
  try {
    const emailHtml = VerificationEmailTemplate(username, otp);
    await transporter.sendMail({
      from: ` "Whissperly" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Whissperly, Verification Code",
      text: "otp sent succesfully",
      html: emailHtml,
    });
    return {
      success: true,
      isAcceptingMessage: false,
      message: "verification email sent  successfully...",
      messages: [],
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      isAcceptingMessage: false,
      message: "Failed  to sent ",
      messages: [],
    };
  }
}
