import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pizzaImg from '../assets/56358703a71428bad6f8180bac9ad440a389a541.png';

const PORTIONS = [
  { label: 'Personal (4 Slides)',  price: '$0.00'  },
  { label: 'Medium (8 Slides)',    price: '$3.00'  },
  { label: 'Familiar (10 Slides)', price: '$6.00'  },
  { label: 'Jumbo (12 Slides)',    price: '$10.00' },
];

const CheckoutPage = () => {
  const [qty, setQty] = useState(3);
  const [selected, setSelected] = useState(3);
  const navigate = useNavigate();

  return (
    <div className="screen" style={{ background: '#fff' }}>
      <div className="scroll-area">

        <div
          style={{
            margin: '16px 16px 16px',
            borderRadius: 24,
            overflow: 'hidden',
            height: 224,
            position: 'relative',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12)',
            background: '#111',
          }}
        >
          <img
            src={pizzaImg}
            alt="Pizza"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />

          <button
            type="button"
            onClick={() => navigate('/products')}
            aria-label="Back to Products"
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 19l-7-7 7-7"
                stroke="#111"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div style={{ padding: '0 20px 24px' }}>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 800, color: '#FF5701' }}>
              ₹14.00
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                type="button"
                onClick={() => setQty(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: '#FF5701',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </button>

              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#111',
                  minWidth: 16,
                  textAlign: 'center',
                }}
              >
                {qty}
              </span>

              <button
                type="button"
                onClick={() => setQty(q => q + 1)}
                aria-label="Increase quantity"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: '#FF5701',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 6 }}>
            Lorem ipsum dolor sit amet
          </h2>

          <p style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.6, marginBottom: 20 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>

          <p style={{ fontSize: 15, fontWeight: 800, color: '#111', marginBottom: 14 }}>
            Personal portion
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PORTIONS.map((portion, idx) => {
              const isSelected = selected === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelected(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      color: isSelected ? '#111' : '#6b7280',
                      fontWeight: isSelected ? 600 : 400,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {portion.label}
                  </span>

                  <div
                    style={{
                      flex: 1,
                      borderBottom: '1.5px dotted #d1d5db',
                      margin: '0 8px',
                      height: 1,
                      alignSelf: 'center',
                    }}
                  />

                  <span
                    style={{
                      fontSize: 13,
                      color: isSelected ? '#111' : '#6b7280',
                      fontWeight: isSelected ? 600 : 400,
                      marginRight: 10,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {portion.price}
                  </span>

                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      border: '1.5px solid #FF5701',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isSelected ? (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: '#FF5701',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          border: '1.2px solid #FF5701',
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <div
        style={{
          flexShrink: 0,
          padding: '10px 20px calc(12px + env(safe-area-inset-bottom, 0px))',
          background: '#fff',
        }}
      >
        <button
          type="button"
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
            boxShadow: '0 4px 12px rgba(255, 87, 1, 0.25)',
          }}
        >
          Add to cart
        </button>

        <div
          style={{
            width: 134,
            height: 5,
            background: '#111',
            borderRadius: 3,
            margin: '12px auto 0',
          }}
        />
      </div>
    </div>
  );
};

export default CheckoutPage;
