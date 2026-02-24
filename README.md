# Neon Clear - Intelligent Transparency Agent

An AI agent for Neon Arcade that acts as a "Bridge of Trust", providing transparency around GDPR data rights and cloud performance metrics.

## Features

- 🤖 EU AI Act Art. 50 Compliant (discloses AI nature)
- 🔒 Data Privacy Check on every interaction
- 📊 Transparent recommendation logic
- 🚨 Human handover for unauthorized charges / privacy violations

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/neonclear-agent)

Or via CLI:

```bash
npm i -g vercel
vercel
```

## Environment Variables

Set `OPENAI_API_KEY` in your Vercel project settings.

## API Endpoint

```
POST /api
{
  "message": "Your question here",
  "history": [] // optional conversation history
}
```

## Web Interface

Visit the deployed URL to chat with Neon Clear through the web UI.
