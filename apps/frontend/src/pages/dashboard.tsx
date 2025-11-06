import { Button, Theme, Tile } from '@carbon/react';
import { useAuth } from '@/providers/auth-provider';

export default function DashboardPage() {
  const { clearSession } = useAuth();
  return (
    <Theme theme="g10">
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh', padding: '2rem' }}>
        <Tile style={{ width: 640 }}>
          <h2 style={{ marginBottom: 16 }}>Dashboard</h2>
          <p>Welcome! The dashboard is coming soon.</p>
          <div style={{ marginTop: 16 }}>
            <Button kind="ghost" onClick={clearSession}>Sign out</Button>
          </div>
        </Tile>
      </div>
    </Theme>
  );
}

