// app/components/AttributionHiddenClient.tsx
'use client';
import { useEffect, useRef } from 'react';

export function AttributionHiddenClient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = JSON.parse(sessionStorage.getItem('attribution') || '{}');
    const keys = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'utm_id',
      'fbclid',
      'gclid',
      'wbraid',
      'gbraid',
      'msclkid',
      '_first_seen',
      '_landing_path',
    ];

    if (ref.current) {
      ref.current.innerHTML = keys
        .filter((k) => a?.[k])
        .map(
          (k) =>
            `<input type="hidden" name="${k}" value="${String(a[k]).replaceAll(
              '"',
              '&quot;'
            )}" />`
        )
        .join('');
    }
  }, []);

  return <div ref={ref} />;
}
