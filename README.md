# Instagram Phishing Awareness Project

⚠️ **EDUCATIONAL PURPOSE ONLY** ⚠️

This is a cybersecurity awareness demonstration project designed to educate users about phishing attacks and location tracking. This project is intended for use in security awareness presentations, cybersecurity expos, and educational settings.

## ⚠️ Important Disclaimer

- **This project is for EDUCATIONAL and AWARENESS purposes ONLY**
- **DO NOT use this to collect real user credentials**
- **Only use demo/test credentials during demonstrations**
- **Always obtain explicit consent from participants**
- **Never use this project maliciously or without proper authorization**

## Features

- 🎭 Realistic Instagram login page replica
- 📍 Location tracking demonstration (requests browser geolocation)
- 🔐 Credential capture simulation (sends to Discord webhook)
- 🎓 Educational tool for cybersecurity awareness

## Prerequisites

- Node.js 18+ installed
- A Discord server with webhook access
- Modern web browser with geolocation support

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Discord Webhook

1. Go to your Discord server
2. Navigate to: **Server Settings** → **Integrations** → **Webhooks**
3. Click **Create Webhook**
4. Choose the channel where you want to receive notifications
5. Copy the webhook URL

### 3. Set Environment Variables

Create a `.env.local` file in the root directory:

```env
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. **Location Tracking**: When a user visits the page, the browser requests location permission. If granted, the exact coordinates are sent to your Discord channel.

2. **Credential Capture**: When a user enters credentials and submits the form, the data (along with location if available) is sent to your Discord webhook.

3. **Educational Demonstration**: After the demo, you can show participants:
   - How easily location can be accessed
   - How phishing pages can look identical to real sites
   - The importance of verifying URLs and website authenticity
   - The dangers of entering credentials on suspicious sites

## Project Structure

```
instagram-location/
├── app/
│   ├── api/
│   │   └── discord/
│   │       └── route.ts      # Discord webhook API endpoint
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Main page with location logic
│   └── globals.css           # Global styles
├── components/
│   ├── InstagramLogin.tsx    # Instagram login component
│   └── InstagramLogin.module.css  # Component styles
├── package.json
├── next.config.js
└── README.md
```

## Security Best Practices Demonstrated

Use this project to teach:

1. **URL Verification**: Always check the URL before entering credentials
2. **HTTPS**: Look for the padlock icon and HTTPS in the address bar
3. **Location Privacy**: Be cautious when websites request location access
4. **Two-Factor Authentication**: Enable 2FA on all important accounts
5. **Password Managers**: Use password managers to detect phishing sites
6. **Suspicious Behavior**: If something feels off, verify through official channels

## Ethical Guidelines

- ✅ Use only in controlled, educational environments
- ✅ Obtain explicit consent from all participants
- ✅ Clearly explain the demonstration purpose
- ✅ Use only demo/test credentials
- ✅ Delete all captured data after demonstrations
- ❌ Never use in production or on unsuspecting users
- ❌ Never collect real user credentials
- ❌ Never use for malicious purposes

## License

This project is provided for educational purposes only. Use responsibly and ethically.

## Contributing

This is an educational demonstration project. If you have suggestions for improving the educational value or security awareness aspects, please feel free to contribute.

## Support

For questions about using this for educational purposes, please ensure you're following all ethical guidelines and local laws regarding cybersecurity demonstrations.

