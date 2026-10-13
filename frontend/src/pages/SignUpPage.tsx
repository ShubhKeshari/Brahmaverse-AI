import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NumPad from '../components/NumPad';

const SignUpPage = () => {
  const [phone, setPhone] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const navigate = useNavigate();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      if (e.key >= '0' && e.key <= '9') {
        if (phone.length < 10) {
          setPhone(prev => (prev.length < 10 ? prev + e.key : prev));
        }
      } else if (e.key === 'Backspace') {
        setPhone(prev => prev.slice(0, -1));
      } else if (e.key === 'Enter') {
        if (phone.length >= 5) {
          navigate('/otp');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phone, navigate]);

  const handlePress = (val: string) => {
    setIsFocused(true);
    if (phone.length < 10) setPhone(p => p + val);
  };

  const handleDelete = () => {
    setIsFocused(true);
    setPhone(p => p.slice(0, -1));
  };

  const handleGetOTP = () => {
    if (phone.length >= 5) {
      navigate('/otp');
    }
  };

  return (
    <div className="screen">
      <input
        ref={hiddenInputRef}
        type="tel"
        inputMode="numeric"
        maxLength={10}
        value={phone}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={e => {
          const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
          setPhone(clean);
        }}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: 0,
          height: 0,
        }}
        aria-hidden="true"
      />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 20px' }}>
        <button
          type="button"
          aria-label="Back"
          style={{
            marginTop: 20,
            marginBottom: 24,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 19l-7-7 7-7"
              stroke="#FF5701"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', lineHeight: 1.2, marginBottom: 8 }}>
          Sign Up to Fastor
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.5, marginBottom: 28 }}>
          Let us know your mobile number and we will send you an OTP for verification.
        </p>

        <div
          onClick={() => {
            hiddenInputRef.current?.focus();
            setIsFocused(true);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            border: `1.5px solid ${isFocused ? '#FF5701' : '#e5e7eb'}`,
            borderRadius: 14,
            padding: '0 16px',
            height: 52,
            background: '#fff',
            cursor: 'text',
            transition: 'border-color 0.2s ease',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>+91</span>

          {!phone ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isFocused && (
                <div
                  className="blinking-cursor"
                  style={{
                    width: 2,
                    height: 22,
                    background: '#FF5701',
                    margin: '0 8px',
                    borderRadius: 1,
                  }}
                />
              )}
              <span
                style={{
                  fontSize: 15,
                  color: '#9ca3af',
                  marginLeft: isFocused ? 0 : 8,
                }}
              >
                - 00000
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#111',
                  letterSpacing: '1px',
                }}
              >
                {phone}
              </span>
              {isFocused && (
                <div
                  className="blinking-cursor"
                  style={{
                    width: 2,
                    height: 22,
                    background: '#FF5701',
                    marginLeft: 3,
                    borderRadius: 1,
                  }}
                />
              )}
            </div>
          )}
        </div>

        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={handleGetOTP}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 12,
            background: '#FF5701',
            color: '#fff',
            fontSize: 16,
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            marginBottom: 12,
            boxShadow: '0 4px 12px rgba(255, 87, 1, 0.25)',
          }}
        >
          Get OTP
        </button>

        <p style={{ textAlign: 'center', fontSize: 11, color: '#9ca3af', marginBottom: 14 }}>
          By clicking, I accept the{' '}
          <span style={{ fontWeight: 700, color: '#4b5563' }}>Terms &amp; Conditions</span>
          {' '}and{' '}
          <span style={{ fontWeight: 700, color: '#4b5563' }}>Privacy Policy</span>
        </p>
      </div>

      <NumPad onPress={handlePress} onDelete={handleDelete} />
    </div>
  );
};

export default SignUpPage;
