export default function VerificationEmailTemplate(
  username: string,
  otp: string
) {
  return `
  <html>
  <head>
  </head>
  <body>
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2 ">
      <div style="margin:20px auto;width:70%;padding:20px 0">
      <a href="" ><img src="https://res.cloudinary.com/dwajmx8y7/image/upload/v1746336303/images/pukuvzpyqayxqnn3kmry.png" alt="IMG-20240818-153158-007" border="0" style="border-radius:50%; height:50px; "></a>
        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #eee">
          <a href="" style="font-size:2.4em;color: #00466a;text-decoration:none;font-weight:600">Whissperly</a>
          
        </div>
        <p style="font-size:1.1em">Hi User,</p>
        <p style="font-size:1.4em font-weight:300">${username}</p>
        <p> Use the following OTP to complete your Sign Up procedures. OTP is valid for 1 hour</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>

        <p style="font-size:0.9em;">Feel free to ignore if you didn't request any code </p>
        <p style="font-size:0.9em;">Regards, Whissperly</p>
        <hr style="border:none;border-top:1px solid #eee" />
      </div>
    </div>
  </body>
  </html>
  
`;
}
