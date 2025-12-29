# GDPR Cookie Consent Implementation

This project uses a custom GDPR-compliant cookie consent banner implemented with Mantine Drawer and nanostores.

## Implementation Overview

### Components

- **[GdprBanner.tsx](src/components/GdprBanner.tsx)** - Mantine Drawer component that slides up from bottom
- **[gdpr-store.ts](src/lib/gdpr-store.ts)** - Nanostores state management for consent
- **[consent.ts](src/lib/consent.ts)** - Utilities for checking consent in analytics code

### How It Works

1. **Server-side cookie reading**: [BaseLayout.astro](src/layouts/BaseLayout.astro) reads cookies using Astro's cookie API
2. **State management**: Cookie values are passed to GdprBanner and synced to nanostores
3. **Client-side updates**: User choices update both cookies and stores simultaneously
4. **Shared state**: All React islands can access consent state via nanostores

### Cookies Used

- `bg.showbanner` - Controls banner visibility (default: not set, shows banner)
- `bg.allowcookies` - Stores consent choice (default: not set, no tracking)

## GDPR 2025 Compliance

This implementation follows 2025 GDPR best practices:

✅ **Equal prominence** - Accept and Decline buttons have equal visual weight
✅ **No dark patterns** - Both buttons clearly labeled and accessible
✅ **Prior consent** - No tracking until user explicitly accepts
✅ **Clear messaging** - Simple language explaining cookie use
✅ **Easy access to policy** - Privacy policy link prominently displayed
✅ **Keyboard accessible** - Full keyboard navigation support via Mantine
✅ **High contrast** - WCAG AA compliant text colors

## Usage in Analytics Code

### Check consent before tracking

```tsx
import { hasAllowedCookies } from '@/lib/consent';

function trackEvent(eventName: string) {
  if (!hasAllowedCookies()) {
    return; // Don't track if user hasn't consented
  }

  // Send analytics event
  gtag('event', eventName);
}
```

### Wait for consent before loading scripts

```tsx
import { waitForConsent } from '@/lib/consent';

waitForConsent(() => {
  // Load GTM or other analytics scripts
  window.dataLayer = window.dataLayer || [];
  gtag('config', 'GA_MEASUREMENT_ID');
});
```

### Access consent in React islands

```tsx
import { useStore } from '@nanostores/react';
import { cookieConsentStore } from '@/lib/gdpr-store';

export function MyComponent() {
  const hasConsent = useStore(cookieConsentStore);

  useEffect(() => {
    if (hasConsent) {
      // Enable analytics features
    }
  }, [hasConsent]);
}
```

## Testing

1. Open site in incognito/private window
2. Banner should appear at bottom
3. Click "Decline cookies" - banner should disappear, no tracking
4. Refresh page - banner should not reappear
5. Clear cookies and refresh
6. Click "Allow cookies" - banner should disappear, tracking enabled
7. Check browser DevTools → Application → Cookies to verify cookie values

## References

Based on 2025 GDPR best practices from:
- [GTM, Cookie Consent, and Partytown in Astro 5](https://rafalszymanski.pl/en/blog/cookie-gtm-astro-guide/)
- [GDPR Cookie Consent Rules 2025](https://www.auditzo.com/blog/gdpr-cookie-consent-rules-2025)
- [Astro Cookies API](https://docs.astro.build/en/reference/api-reference/)
- [Sharing State Between Islands](https://docs.astro.build/en/recipes/sharing-state-islands/)
