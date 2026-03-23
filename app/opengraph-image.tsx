import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Mines — демо-игра с AI предсказаниями на 1win';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0b12 0%, #141415 40%, #0e0f18 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '0 80px',
        }}
      >
        {/* Background radial glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 500,
            background: 'radial-gradient(ellipse, rgba(0,232,122,0.07) 0%, transparent 65%)',
            borderRadius: '50%',
          }}
        />

        {/* Mini mines grid — decorative */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            right: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 9,
            opacity: 0.45,
          }}
        >
          {[
            [true,  false, true,  true,  false],
            [true,  true,  false, true,  true ],
            [false, true,  true,  false, true ],
            [true,  false, true,  true,  false],
            [true,  true,  false, true,  true ],
          ].map((row, ri) => (
            <div key={ri} style={{ display: 'flex', gap: 9 }}>
              {row.map((safe, ci) => (
                <div
                  key={ci}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: safe
                      ? 'rgba(0,200,100,0.18)'
                      : 'rgba(255,255,255,0.03)',
                    border: safe
                      ? '1.5px solid rgba(0,200,100,0.45)'
                      : '1.5px solid rgba(255,255,255,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    color: safe ? 'rgba(74,222,128,0.9)' : 'transparent',
                    fontWeight: 900,
                  }}
                >
                  {safe ? '✓' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Subtle corner glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            left: -80,
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 660 }}>
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 16px',
              borderRadius: 100,
              background: 'rgba(0,200,100,0.1)',
              border: '1.5px solid rgba(0,200,100,0.28)',
              marginBottom: 28,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                background: '#00e87a',
                boxShadow: '0 0 8px rgba(0,232,122,0.8)',
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: 'rgba(74,222,128,0.95)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              AI Аналитик • 1win Casino
            </span>
          </div>

          {/* Main headline */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.0,
              marginBottom: 8,
              letterSpacing: '-0.025em',
            }}
          >
            Mines
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.3,
              marginBottom: 36,
              letterSpacing: '-0.01em',
            }}
          >
            Демо-игра с AI предсказаниями мин
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[
              { text: '🤖 AI знает где мины', accent: false },
              { text: '💎 Промокод MARCHMINES', accent: true },
              { text: '🎯 Бонус 500% на 1win', accent: false },
            ].map(({ text, accent }) => (
              <div
                key={text}
                style={{
                  padding: '10px 18px',
                  borderRadius: 12,
                  background: accent
                    ? 'rgba(0,200,100,0.12)'
                    : 'rgba(255,255,255,0.05)',
                  border: accent
                    ? '1.5px solid rgba(0,200,100,0.3)'
                    : '1.5px solid rgba(255,255,255,0.09)',
                  fontSize: 15,
                  fontWeight: 600,
                  color: accent ? 'rgba(74,222,128,0.95)' : 'rgba(255,255,255,0.7)',
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Domain watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            right: 80,
            fontSize: 17,
            color: 'rgba(255,255,255,0.18)',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          mines-game.ru
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
