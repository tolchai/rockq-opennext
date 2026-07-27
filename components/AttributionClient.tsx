'use client';
import { useEffect } from 'react';

const TRACK_KEYS = [
  'fbclid',
  'gclid',
  'wbraid',
  'gbraid',
  'msclkid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
];

export function AttributionClient() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const picked: Record<string, string> = {};

    url.searchParams.forEach((value, key) => {
      if (key.startsWith('utm_') || TRACK_KEYS.includes(key)) {
        picked[key] = value;
      }
    });

    if (Object.keys(picked).length > 0) {
      const payload = {
        ...picked,
        _first_seen: new Date().toISOString(),
        _landing_path: url.pathname + url.search,
      };
      sessionStorage.setItem('attribution', JSON.stringify(payload));
    }
  }, []);

  return null;
}
