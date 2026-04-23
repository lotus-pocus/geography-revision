import { useState, useEffect } from 'react';

const TOAST_KEY = 'geo_toast_v2';

export default function ToastNotification() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(TOAST_KEY)) {
      const showTimer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(showTimer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    localStorage.setItem(TOAST_KEY, 'seen');
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: visible ? '400px' : '-300px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: '#1a1a2e',
      color: '#ffffff',
      padding: '18px 20px',
      borderRadius: '14px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
      fontSize: '14px',
      fontWeight: '600',
      textAlign: 'center',
      lineHeight: 1.7,
      width: '340px',
      transition: 'bottom 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
      pointerEvents: visible ? 'auto' : 'none',
    }}>
      {/* Close button */}
      <button
        onClick={dismiss}
        style={{
          position: 'absolute',
          top: '8px',
          right: '10px',
          background: 'none',
          border: 'none',
          color: '#ffffff',
          opacity: 0.6,
          fontSize: '16px',
          cursor: 'pointer',
          lineHeight: 1,
          padding: '2px 4px',
        }}
      >✕</button>

      ✨ App updated!
      <br />
      <span style={{ fontWeight: '600', fontSize: '12px', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        New:
      </span>
      <ul style={{ listStyle: 'none', margin: '4px 0 0', padding: 0, textAlign: 'left', fontSize: '15px' }}>
        <li style={{ fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>🔍 Search tab</li>
        <li style={{ fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>⚙️ Intermediate technology</li>
        <li style={{ fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>🌍 NEE globalisation</li>
        <li style={{ fontWeight: '400', opacity: 0.9, padding: '2px 0' }}>🔗 Key terms now link to topics</li>
      </ul>
    </div>
  );
}