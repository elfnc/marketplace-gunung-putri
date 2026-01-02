import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Marketplace UMKM Gunung Putri'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  // 1. Ambil file logo.svg
  // Kita fetch dari domain production agar terbaca oleh Edge Runtime
  // Pastikan file 'logo.svg' sudah ada di folder 'public'
  const logoData = await fetch(new URL('https://marketplace-gunung-putri.vercel.app/logo.svg')).then(
    (res) => res.arrayBuffer()
  )

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F4F1EC', // Secondary Color
          position: 'relative',
        }}
      >
        {/* Background Pattern (Lingkaran Dekorasi) */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: '#1F3D2B', // Primary Color
            opacity: 0.05,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: '#C56A4A', // Accent Color
            opacity: 0.05,
          }}
        />

        {/* Header: Logo + Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          {/* Logo Image */}
          <img
            src={logoData as any}
            width="80"
            height="80"
            style={{
              marginRight: 20,
              objectFit: 'contain'
            }}
          />

          <div style={{ fontSize: 32, color: '#1F3D2B', fontWeight: 600, letterSpacing: '-0.02em' }}>
            MARKETPLACE WARGA
          </div>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 70,
            fontStyle: 'normal',
            fontWeight: 800,
            color: '#1C1C1C',
            lineHeight: 1,
            textAlign: 'center',
            marginBottom: 20,
            padding: '0 40px',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}
        >
          Gunung Putri
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 30,
            color: '#555',
            textAlign: 'center',
            maxWidth: 800,
            fontWeight: 400,
          }}
        >
          Dukung usaha tetangga, belanja lebih dekat.
        </div>

        {/* Accent Bar Bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 16, background: '#1F3D2B' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '40%', height: 16, background: '#C56A4A' }} />
      </div>
    ),
    {
      ...size,
    }
  )
}