# MannRakshak

AI-Powered Dynamic Mental Health Monitoring and Distress Prediction System for Victims of Atrocities.

This is a prototype created for SIH 2026.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy `.env.example` to `.env.local` and add your Gemini API key (optional).
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features Built
- **Landing Page**: Entry point for Victims and Counsellors.
- **Victim Check-in**: Daily form for victims to share mood and text.
- **AI Analysis**: Server-side logic using `@google/genai` (with deterministic demo fallback).
- **Personal Trend Dashboard**: Shows history of distress score and linguistic drift using Recharts.
- **Counsellor Dashboard**: View all anonymized cases with risks and trends.
- **Case Details**: Detailed case view with explainable alerts and action buttons to acknowledge alerts.

## Demo Mode
If `GEMINI_API_KEY` is not provided in `.env.local`, the application will use a deterministic mock AI fallback which will still parse the check-in text for keywords (like "tired", "sleep", "hard", "memory", "hopeless") to generate risk scores, mimicking the AI response structure.
