const UPDATES = [
  {
    date: 'April 2026',
    title: 'Content & navigation updates',
    items: [
      'New topic: Intermediate / Appropriate Technology (including biogas digesters)',
      'New topic: How Globalisation Affects NEEs (China vs India comparison)',
      'India bottom-up card updated with biogas digester example',
      'New 🔍 Search tab - search across all topics, key terms, bullet points and exam tips',
      'Key Terms tab now links directly to the topic each term appears in',
      'Flashcards now support multi-topic deck building - tap multiple topic pills to mix and match',
      'Checklist updated with new topics',
    ],
  },
];

export default function Updates() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <p className="view-intro">A log of what's been added or changed in the app.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {UPDATES.map((update, i) => (
          <div key={i} style={{
            background: '#ffffff',
            border: '1.5px solid #e5e7eb',
            borderRadius: '14px',
            overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{
              background: '#1a1a2e',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '1rem' }}>✨</span>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af', margin: 0 }}>{update.date}</p>
                <p style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ffffff', margin: 0 }}>{update.title}</p>
              </div>
            </div>

            {/* Items */}
            <ul style={{ listStyle: 'none', margin: 0, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {update.items.map((item, j) => (
                <li key={j} style={{
                  fontSize: '0.875rem',
                  color: '#374151',
                  lineHeight: 1.6,
                  paddingLeft: '16px',
                  position: 'relative',
                }}>
                  <span style={{
                    position: 'absolute', left: 0, top: '6px',
                    width: '6px', height: '6px',
                    background: '#10b981',
                    borderRadius: '50%',
                    display: 'block',
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}