import { useId } from 'react';

interface LogoProps {
  size?: number;
  showText?: boolean;
  variant?: 'default' | 'light';
}

export default function Logo({ size = 40, showText = true, variant = 'default' }: LogoProps) {
  const uniqueId = useId();
  const isLight = variant === 'light';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ProfileEval Logo"
        role="img"
      >
        {/* Unique Gradient Definitions */}
        <defs>
          <linearGradient id={`${uniqueId}-main`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
          <linearGradient id={`${uniqueId}-accent`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fcd34d" />
          </linearGradient>
          <linearGradient id={`${uniqueId}-inner`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f3f4f6" />
          </linearGradient>
          <filter id={`${uniqueId}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Outer Hexagonal Shape - Unique to ProfileEval */}
        <path
          d="M50 2 L91 25 L91 75 L50 98 L9 75 L9 25 Z"
          fill={`url(#${uniqueId}-main)`}
          filter={`url(#${uniqueId}-shadow)`}
        />
        
        {/* Inner decorative ring */}
        <path
          d="M50 10 L83 28 L83 72 L50 90 L17 72 L17 28 Z"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
        
        {/* Stylized "PE" Monogram - Unique identifier */}
        <g transform="translate(22, 28)">
          {/* P letter stylized */}
          <path
            d="M8 8 L8 40 M8 8 L22 8 Q30 8 30 16 Q30 24 22 24 L8 24"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* E letter stylized */}
          <path
            d="M40 8 L56 8 M40 8 L40 40 M40 24 L52 24 M40 40 L56 40"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        
        {/* Score Star Badge - Trademark element */}
        <g transform="translate(68, 8)">
          <circle cx="12" cy="12" r="14" fill={`url(#${uniqueId}-accent)`} />
          <path
            d="M12 4 L14 10 L20 10 L15 14 L17 20 L12 16 L7 20 L9 14 L4 10 L10 10 Z"
            fill="white"
          />
        </g>
        
        {/* Bottom accent line - Signature element */}
        <path
          d="M25 82 Q50 88 75 82"
          stroke={`url(#${uniqueId}-accent)`}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Small dots - Unique pattern */}
        <circle cx="20" cy="50" r="2" fill="rgba(255,255,255,0.6)" />
        <circle cx="80" cy="50" r="2" fill="rgba(255,255,255,0.6)" />
      </svg>
      
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span
            style={{
              fontSize: size * 0.4,
              fontWeight: 800,
              color: isLight ? '#ffffff' : undefined,
              background: isLight 
                ? 'none'
                : 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%)',
              WebkitBackgroundClip: isLight ? undefined : 'text',
              WebkitTextFillColor: isLight ? '#ffffff' : 'transparent',
              backgroundClip: isLight ? undefined : 'text',
              fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
              letterSpacing: '-0.5px',
              textShadow: isLight ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
            }}
          >
            Profile Evaluator
          </span>
          <span
            style={{
              fontSize: size * 0.18,
              fontWeight: 500,
              color: isLight ? 'rgba(255,255,255,0.85)' : '#764ba2',
              fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            Score • Learn • Build
          </span>
        </div>
      )}
    </div>
  );
}

