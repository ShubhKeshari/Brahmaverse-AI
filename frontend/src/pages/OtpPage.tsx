import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NumPad from '../components/NumPad';

const DUMMY_OTP = '123456';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const [secs, setSecs] = useState(30);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const navigate = useNavigate();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (secs <= 0) return;
    const t = setTimeout(() => setSecs(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      if (e.key >= '0' && e.key <= '9') {
        if (otp.length < 6) {
          setOtp(prev => prev + e.key);
          setError('');
        }
      } else if (e.key === 'Backspace') {
        setOtp(prev => prev.slice(0, -1));
        setError('');
      } else if (e.key === 'Enter') {
        handleContinue();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [otp]);

  const handlePress = (val: string) => {
    setIsFocused(true);
    if (otp.length < 6) {
      setOtp(p => p + val);
      setError('');
    }
  };

  const handleDelete = () => {
    setIsFocused(true);
    setOtp(p => p.slice(0, -1));
    setError('');
  };

  const handleContinue = () => {
    if (otp === DUMMY_OTP) {
      navigate('/products');
    } else {
      setError('Invalid OTP. Please enter 123456');
    }
  };

  const timerText = `(00:${String(secs).padStart(2, '0')})`;

  const renderBox = (i: number) => {
    const char = otp[i] ?? '';
    const isActive = i === otp.length;

    return (
      <div
        key={i}
        onClick={() => {
          hiddenInputRef.current?.focus();
          setIsFocused(true);
        }}
        style={{
          width: 44,
          height: 50,
          borderRadius: 10,
          border: `1.5px solid ${isActive && isFocused ? '#FF5701' : char ? '#111827' : '#e5e7eb'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 700,
          color: '#111',
          background: '#fff',
          position: 'relative',
          cursor: 'text',
          transition: 'border-color 0.15s ease',
        }}
      >
        {char ? (
          char
        ) : isActive && isFocused ? (
          <div
            className="blinking-cursor"
            style={{
              width: 2,
              height: 22,
              background: '#FF5701',
              borderRadius: 1,
            }}
          />
        ) : null}
      </div>
    );
  };

  return (
    <div className="screen">
      <input
        ref={hiddenInputRef}
        type="tel"
        inputMode="numeric"
        maxLength={6}
        value={otp}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={e => {
          const clean = e.target.value.replace(/\D/g, '').slice(0, 6);
          setOtp(clean);
          setError('');
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
          onClick={() => navigate('/')}
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

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 6 }}>
          6-digit code
        </h1>
        <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 2 }}>
          Please enter the code we've sent to
        </p>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#111', marginBottom: 28 }}>
          +91 12345 67890
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
          {renderBox(0)}
          {renderBox(1)}
          {renderBox(2)}
          <span style={{ fontSize: 20, color: '#9ca3af', fontWeight: 300, margin: '0 2px' }}>-</span>
          {renderBox(3)}
          {renderBox(4)}
          {renderBox(5)}
        </div>

        {error && (
          <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 6 }}>{error}</p>
        )}

        <p style={{ fontSize: 13, color: '#6b7280' }}>
          I didn't receive a code{' '}
          {secs > 0 ? (
            <span style={{ color: '#FF5701', fontWeight: 700 }}>{timerText}</span>
          ) : (
            <button
              type="button"
              onClick={() => setSecs(30)}
              style={{
                color: '#FF5701',
                fontWeight: 700,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              Resend
            </button>
          )}
        </p>

        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>
          💡 Dummy OTP: <strong style={{ color: '#374151' }}>{DUMMY_OTP}</strong>
        </p>

        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={handleContinue}
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
            marginBottom: 16,
            boxShadow: '0 4px 12px rgba(255, 87, 1, 0.25)',
          }}
        >
          Continue
        </button>
      </div>

      <NumPad onPress={handlePress} onDelete={handleDelete} />
    </div>
  );
};

export default OtpPage;
