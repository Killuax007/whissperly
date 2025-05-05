# Whisperly 🕊️

**Whisperly** is an anonymous social messaging platform built with **Next.js**. It allows users to send and receive open-ended, AI-generated messages without revealing their identity. Ideal for curious minds, fun prompts, and social interaction — safely and securely.

---

## 🧩 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via Mongoose)
- **API**: Google Gemini API
- **Deployment**: Vercel

---

## 🔐 Features

- Anonymous message sending
- AI-generated open-ended prompts (Gemini)
- Responsive UI with Tailwind
- No authentication required (user ID-based messaging)
- Mobile-friendly & dark-mode support

---

## 📁 Project Structure

```
whissperly/
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── models/
│   └── styles/
├── .gitignore
├── README.md
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## 🔗 API Routes

### 📬 `POST /api/accept-messages`

Allow User to update message acceptance status.

- **Body**:

```json
{
  "success": "true",
  "message": "Message acceptance status updated"
}
```

### 📬 `POST /api/all-messages`

Fetch all messages from databases.

- **Body**:

```json
{
  "success": "true",
  "messages": []
}
```

### 📬 `POST /api/auth/[...nextauth]`

User authenticated routes are here Check user staus via session and logged in them .

- **Body**:

```json
{
  "success": "true",
  "User": {
    "name": "Satya",
    "_id": "kjlh987987jh",
    "email": "satya12@gmail.com",
    "password": "hjjhuore.08979hjnvfikgs.lkhjoffoujhjb"
  }
}
```

### 📬 `POST /api/check-username`

Checks a username is unique or not .

- **Body**:

```json
{
  "success": "true",
  "messages": []
}
```

### 📬 `POST /api/delete-message`

Delete a message from database.

- **Body**:

```json
{
  "success": "true",
  "message": "Message Successfully deleted "
}
```

### 📬 `POST /api/get-message`

Fetch a message from database.

- **Body**:

```json
{
  "success": "true",
  "message": "Message fetched successfully "
}
```

### 📬 `POST /api/send-message`

Send a message to user.

- **Body**:

```json
{
  "success": "true",
  "message": "Message sent Successfully  "
}
```

### 📬 `POST /api/sign-up`

Save user info inside databse and sent a otp to user via email.

- **Body**:

```json
{
  "success": "true",
  "message": "User registried sucessfully Please verify your account  "
}
```

### 📬 `POST /api/verify-otp`

Verify entered otp to the otp fetched from database.

- **Body**:

```json
{
  "success": "true",
  "message": "Verification code verified Successfully  "
}
```

### 📬 `GET /api/suggest-message`

Generate 3 message to according our prompt and sent it to user .

---

## 🌈 Prompt Theme Examples

- **dreams**, **travel**, **creativity**, **music**, **random**, **thoughts**, **future**, **life hacks**, **superpowers**, **goals, movies**, **friendship**

```js
const prompt = `Create a list of three unique and short question words range 10-15, open-ended, and engaging questions focusing on the theme of "${randomTheme}". Each question should be separated by '||'. These questions are for an anonymous social messaging platform like Qooh.me. Avoid personal or sensitive topics, and ensure the questions encourage interaction, curiosity, and positivity.`;
```

- **Body**:

```json
{
  "success": "true",
  "message": "Message Successfully deleted "
}
```

## 📦 Installation

### Clone this repository to your local

```bash

git clone https://github.com/yourusername/whisperly.git
cd whisperly
npm install

```

### Create a .env file with:

```bash

MONGODB_URI= "Mongodb URI here"
SECRET_KEY= "secretkey"
# gemini key
GOOGLE_GEMINI_API= "API key here"
# nodemailer configuration
EMAIL_USER= "Host email here "
EMAIL_PASS= "Host email app password "

```

### Run the server

```bash
npm run dev
```

---

## 🚀 Deployment

Deploy on Vercel for instant full-stack hosting with environment variable support.

## 👨‍💻 Author

Manoj Kumar Panda

