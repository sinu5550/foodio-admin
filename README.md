# Foodio Admin (Dashboard)

A powerful administrative control panel for the Foodio ecosystem. Manage the menu and orders with lightning-fast efficiency.

## 🚀 Live Demo

- **Dashboard**: https://foodio-admin-siyan.vercel.app/

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Design System**: Custom professional dashboard UI (Clean & Minimalist)
- **Media Handling**: Multipart/form-data with image preview
- **Feedback**: [Sonner](https://sonner.emilkowal.ski/) (Beautiful toast notifications)
- **Verification**: Fully environment-parameterized API integrations

## ✨ Key Features

- **Menu Management**: Full CRUD capabilities for Categories and Menu Items.
- **Order Command Center**: Real-time order listing with instant status updates (Preparing, Ready, etc.).
- **Image Upload Integration**: Seamlessly upload food photos directly to the server with instant UI feedback.
- **Smart Modals**: Clean and concise Add/Edit modals for all data types.
- **Navigation**: Persistent sidebar with active-state tracking and professional edge-to-edge dividers.
- **Secure Redirection**: Environment-aware sign-out flow that redirects to the live user site.

## 📂 Architecture

- `src/components/modals`: Centralized management modals for clean code.
- `src/app/orders`: Real-time order management system.
- `src/app/page.tsx`: Unified hub for Menu and Category administration.

## ⚙️ Installation & Setup (Local)

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Configure Environment Variables**:
   Create a `.env` file:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   NEXT_PUBLIC_USER_URL="http://localhost:3000"
   ```
4. **Run Development Server**: `npm run dev`

## 👨‍💻 Developed by

[Intisar_Ahmed_Siyan] - Passionate Full-Stack Developer
