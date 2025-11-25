import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Phishing Awareness Project - Cybersecurity Education Demo',
  description: 'This is a legal phishing awareness and cybersecurity education project designed for security awareness training, cybersecurity expos, and educational demonstrations. This project demonstrates how phishing attacks work to educate users about online security threats. No real credentials are collected or stored. This is an educational tool only.',
  keywords: [
    'phishing awareness',
    'cybersecurity education',
    'security awareness training',
    'phishing demonstration',
    'cybersecurity awareness',
    'educational security project',
    'phishing prevention',
    'online security education',
    'cybersecurity expo',
    'security awareness demo',
  ],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'FfzVsyaS2M5ojeVmNI3qwKlkP6yqjM7mHMN9lL-_twA',
  },
  openGraph: {
    title: 'Phishing Awareness Project - Cybersecurity Education',
    description: 'Legal phishing awareness and cybersecurity education project for security training and educational demonstrations',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

