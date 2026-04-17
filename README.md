# Social AI - Instagram Clone with Real-time Moderation

Social AI is a modern Instagram-inspired social media platform powered by real-time AI toxicity detection. Every comment you write is analyzed by an AI model to ensure a safe and respectful community.

## ✨ Features

- **Instagram-style Feed**: Beautiful, responsive layout with masonry-like post structure.
- **Real-time AI Moderation**: Instantly detect toxic comments before they are posted.
- **Smart Feedback UI**: Contextual warnings and suggestions for toxic content.
- **Modern Tech Stack**: Next.js 16 (App Router), Tailwind CSS, Framer Motion, and Lucide React.
- **DiceBear Avatars**: Dynamic user profile images for each user.

## 🛠 Tech Stack

- **Frontend**: Next.js 16, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Backend API**: FastAPI (Mock provided)

## 🚀 Getting Started

### 1. START THE AI BACKEND
The frontend requires a running AI backend on port 8000. For demonstration purposes, we've provided a mock server.

**Prerequisites**: Python 3.9+
```bash
pip install fastapi uvicorn
python mock-backend.py
```
This starts the moderation API on `http://localhost:8000/predict`.

### 2. START THE FRONTEND
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to explore the app.

## 🧠 AI Moderation Logic

1. When a user submits a comment, it's sent to the backend.
2. The AI analyzes the text for toxic patterns.
3. If **Safe**:
   - Displays a green badge with high confidence score.
   - Comment can be posted.
4. If **Toxic**:
   - Displays a red warning badge.
   - Shows a "Consider rewriting" message.
   - Highlights the comment input with a red border.

## 📂 Project Structure

- `src/app`: Root pages and layouts.
- `src/components`: Reusable UI components (Navbar, PostCard, CommentBox, etc.).
- `src/services`: API communication logic.
- `src/data`: Mock data for posts and users.
- `src/types`: TypeScript interfaces.
