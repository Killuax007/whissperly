# Whisperly 🕊️

**Whisperly** is an anonymous social messaging platform built with **Next.js**. It allows users to send and receive open-ended, AI-generated messages without revealing their identity. Ideal for curious minds, fun prompts, and social interaction — safely and securely.

---

## 🧩 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (via Mongoose)
- **API**: Google Gemini API
- **Deployment**: Vercel / Render / Railway

---

## 🔐 Features

- Anonymous message sending
- AI-generated open-ended prompts (Gemini)
- Responsive UI with Tailwind
- No authentication required (user ID-based messaging)
- Mobile-friendly & dark-mode support

---

## 📁 Project Structure

whissperly/
├── public/ # Static assets (e.g., images, icons)
├── src/ # Source code directory
│ ├── app/ # Next.js App Router pages and layouts
│ ├── components/ # Reusable UI components
│ ├── lib/ # Utility functions and helpers
│ ├── models/ # Mongoose models (e.g., User, Message)
│ └── styles/ # Global and component-specific styles
├── .gitignore # Specifies files and directories to ignore in Git
├── README.md # Project documentation
├── components.json # Component configuration (if applicable)
├── eslint.config.mjs # ESLint configuration
├── next.config.ts # Next.js configuration
├── package-lock.json # Auto-generated lockfile for npm
├── package.json # Project metadata and dependencies
├── postcss.config.mjs # PostCSS configuration
└── tsconfig.json # TypeScript configuration
