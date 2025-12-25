import { useEffect } from 'react';
import { Container, MantineProvider } from '@mantine/core';
import { theme } from '@/styles/theme';

export function RaiselyEmbed() {
  useEffect(() => {
    // Load Raisely script dynamically after component mounts
    const script = document.createElement('script');
    script.src = 'https://cdn.raisely.com/v3/public/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <MantineProvider theme={theme}>
      <Container className="px-6 pb-12">
        <div
          className="raisely-donate"
          data-campaign-path="bankgreen-donate"
          data-profile=""
          data-width="100%"
          data-height="800"
        />
      </Container>
    </MantineProvider>
  );
}
