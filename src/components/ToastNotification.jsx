import { useState, useEffect } from 'react';

const TOAST_KEY = 'geo_toast_v2';
const MAX_SHOWS = 6;

export default function ToastNotification() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = parseInt(localStorage.getItem(TOAST_KEY) || '0');
    if (seen < MAX_SHOWS) {
      const showTimer = setTimeout(() => setVisible(true), 400);
      const hideTimer = setTimeout(() => {
        setVisible(false);
        localStorage.setItem(TOAST_KEY, String(seen + 1));
      }, 8500);
      return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: visible ? '400px' : '-300px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: '#07aadb',
      color: '#ffffff',
      padding: '18px 16px',
      borderRadius: '14px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
      fontSize: '22px',
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 1.7,
      width: '340px',
      whiteSpace: 'nowrap',
      transition: 'bottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      pointerEvents: 'none',
    }}>
      ✨ App updated!
      <br />
      <span style={{ fontWeight: '600', fontSize: '18px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        New:
      </span>
      <ul style={{ listStyle: 'none', margin: '4px 0 0', padding: 0, textAlign: 'left' }}>
        <li style={{ fontSize: '16px', fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>🔍 Search tab</li>
        <li style={{ fontSize: '16px', fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>⚙️ Intermediate technology</li>
        <li style={{ fontSize: '16px', fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>🌍 NEE globalisation</li>
        <li style={{ fontSize: '16px', fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>🔗 Key terms now link to topics</li>
      </ul>
    </div>
  );
}