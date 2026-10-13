import { useNavigate } from 'react-router-dom';
import pizzaImg from '../assets/56358703a71428bad6f8180bac9ad440a389a541.png';
import shakeImg from '../assets/4cfe3a2795df430a490a016ba4ef2a9d414c3f7e.png';
import burgerImg from '../assets/3c37d039ca4530995428edbfc2eb6145ff1580a6.png';

const BEST_SELLERS = [
  { id: 1, img: shakeImg,  price: '$103.0' },
  { id: 2, img: burgerImg, price: '$50.0'  },
  { id: 3, img: pizzaImg,  price: '$12.99' },
  { id: 4, img: shakeImg,  price: '$8.20'  },
];

const POPULAR_ITEMS = [
  {
    id: 1,
    name: 'Strawberry Shake',
    date: '29 Nov, 01:20 pm',
    price: '₹20.00',
    count: '2 items',
    img: shakeImg,
  },
  {
    id: 2,
    name: 'Chicken Burger',
    date: '17 Oct, 01:20 pm',
    price: '₹20.00',
    count: '1 item',
    img: burgerImg,
  },
];

const ProductsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="screen">
      <div className="scroll-area" style={{ paddingBottom: 24 }}>

        <div style={{ padding: '16px 20px 10px' }}>
          <p style={{ fontSize: 10, color: '#9ca3af', letterSpacing: '0.06em', marginBottom: 2 }}>
            Current Locations
          </p>
          <p style={{ fontSize: 15, fontWeight: 800, color: '#111' }}>
            Model Town, New Delhi
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px', marginBottom: 18 }}>
          <div
            style={{
              flex: 1,
              height: 48,
              background: '#f3f4f6',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 14,
            }}
          >
            <span style={{ fontSize: 14, color: '#4b5563', fontWeight: 500 }}>Karan</span>
          </div>

          <button
            type="button"
            aria-label="Call"
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: 'linear-gradient(180deg, #FF986D 0%, #FF6E6A 100%)',
              border: 'none',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Checkout / Cart"
            onClick={() => navigate('/checkout')}
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              background: 'linear-gradient(180deg, #83D4F3 0%, #4A70C7 100%)',
              border: 'none',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9z"
                stroke="white"
                strokeWidth="1.8"
              />
              <path
                d="M16 10h5v4h-5a2 2 0 010-4z"
                fill="white"
              />
              <circle cx="18.5" cy="12" r="1" fill="#4A70C7" />
            </svg>
          </button>
        </div>

        <div style={{ padding: '0 20px', marginBottom: 18 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 10 }}>
            Best Seller
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {BEST_SELLERS.map(item => (
              <div
                key={item.id}
                onClick={() => navigate('/checkout')}
                style={{
                  position: 'relative',
                  height: 94,
                  borderRadius: 14,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#f3f4f6',
                }}
              >
                <img
                  src={item.img}
                  alt=""
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#E53935',
                    borderRadius: 12,
                    padding: '2px 7px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>
                    {item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          onClick={() => navigate('/checkout')}
          style={{
            margin: '0 20px 10px',
            borderRadius: 16,
            overflow: 'hidden',
            position: 'relative',
            height: 122,
            display: 'flex',
            cursor: 'pointer',
            background: '#FF5701',
          }}
        >
          <div
            style={{
              width: '50%',
              height: '100%',
              position: 'relative',
              background: '#FF5701',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingLeft: 16,
              paddingRight: 6,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -14,
                right: -6,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255, 214, 0, 0.45)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -16,
                left: 16,
                width: 46,
                height: 46,
                borderRadius: '50%',
                background: 'rgba(255, 214, 0, 0.45)',
                pointerEvents: 'none',
              }}
            />

            <p style={{ color: '#fff', fontSize: 11, fontWeight: 500, lineHeight: 1.35, position: 'relative', zIndex: 2 }}>
              Experience our<br />delicious new dish
            </p>
            <p style={{ color: '#fff', fontSize: 26, fontWeight: 900, lineHeight: 1, marginTop: 4, position: 'relative', zIndex: 2 }}>
              30% OFF
            </p>
          </div>

          <div
            style={{
              width: '50%',
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <img
              src={pizzaImg}
              alt="Delicious Pizza Promo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 18 }}>
          <div style={{ width: 16, height: 4, borderRadius: 2, background: '#FF5701' }} />
          <div style={{ width: 5, height: 4, borderRadius: 2, background: '#e5e7eb' }} />
          <div style={{ width: 5, height: 4, borderRadius: 2, background: '#e5e7eb' }} />
          <div style={{ width: 5, height: 4, borderRadius: 2, background: '#e5e7eb' }} />
          <div style={{ width: 5, height: 4, borderRadius: 2, background: '#e5e7eb' }} />
        </div>

        <div style={{ padding: '0 20px' }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: '#111', marginBottom: 14 }}>
            Popular Items
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {POPULAR_ITEMS.map(item => (
              <div
                key={item.id}
                onClick={() => navigate('/checkout')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: 14,
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#111' }}>
                      {item.name}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#FF5701' }}>
                      {item.price}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{item.date}</span>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{item.count}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      type="button"
                      style={{
                        padding: '4px 12px',
                        borderRadius: 18,
                        background: '#FF5701',
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Cancel Order
                    </button>

                    <button
                      type="button"
                      style={{
                        padding: '4px 12px',
                        borderRadius: 18,
                        background: '#FFE8D6',
                        color: '#FF5701',
                        fontSize: 11,
                        fontWeight: 600,
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Track Driver
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;
