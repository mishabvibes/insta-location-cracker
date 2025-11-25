# Quick Setup Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Discord Webhook

1. Open your Discord server
2. Go to **Server Settings** → **Integrations** → **Webhooks**
3. Click **New Webhook** or **Create Webhook**
4. Choose a channel (create a private channel for demo purposes)
5. Copy the webhook URL

## Step 3: Configure Environment

Create a file named `.env.local` in the root directory:

```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
```

**Important**: Replace the URL with your actual Discord webhook URL.

## Step 4: Run the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Test the Demo

1. When you open the page, your browser will ask for location permission
2. If you allow it, the location will be sent to your Discord channel
3. Enter demo credentials (e.g., `demo_user` / `demo_password`)
4. Submit the form
5. Check your Discord channel - you should see both the location and credentials

## For Expo/Demo Presentation

1. Make sure your Discord webhook is set up and working
2. Use a demo account or test credentials only
3. Show participants:
   - How the page looks identical to Instagram
   - How location is captured automatically
   - How credentials are sent to Discord
   - The importance of checking URLs
   - Security best practices

## Troubleshooting

### Location not working?
- Make sure you're using HTTPS or localhost (browsers require secure context for geolocation)
- Check browser permissions in settings

### Discord webhook not receiving messages?
- Verify the webhook URL is correct in `.env.local`
- Check Discord server permissions
- Make sure the webhook is enabled
- Check browser console for errors

### Build errors?
- Make sure Node.js 18+ is installed
- Delete `node_modules` and `.next` folder, then run `npm install` again

