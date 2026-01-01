import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Marketplace UMKM Gunung Putri'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
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
        {/* Background Pattern (Ceritanya Pattern Batik/Abstrak simple) */}
        <div
            style={{
                position: 'absolute',
                top: -100,
                left: -100,
                width: 600,
                height: 600,
                borderRadius: '50%',
                background: '#1F3D2B', // Primary Color
                opacity: 0.1,
            }}
        />
        
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
            }}
        >
             {/* Logo Icon Simple */}
             <div 
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    background: '#1F3D2B',
                    marginRight: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 32,
                    fontWeight: 'bold'
                }}
             >
                GP
             </div>
             <div style={{ fontSize: 30, color: '#1F3D2B', fontWeight: 600 }}>
                MARKETPLACE WARGA
             </div>
        </div>

        <div
          style={{
            fontSize: 70,
            fontStyle: 'normal',
            fontWeight: 'bold',
            color: '#1C1C1C',
            lineHeight: 1.1,
            textAlign: 'center',
            marginBottom: 20,
            padding: '0 40px',
          }}
        >
          Gunung Putri
        </div>

        <div
          style={{
            fontSize: 30,
            color: '#666',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Dukung usaha tetangga, belanja lebih dekat.
        </div>
        
        {/* Accent Bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 16, background: '#C56A4A' }} />
      </div>
    ),
    {
      ...size,
    }
  )
}