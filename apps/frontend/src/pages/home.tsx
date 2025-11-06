import { Button, Heading, Layer, Link, Theme } from '@carbon/react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Theme theme="g10">
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh', padding: '2rem' }}>
        <Layer>
          <div style={{ maxWidth: 720 }}>
            <Heading className="cds--type-expressive-heading-04" style={{ marginBottom: '1rem' }}>
              Welcome to IPT Platform
            </Heading>
            <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Build, learn, and collaborate. Create your account to get started or sign in to continue.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button kind="primary" onClick={() => navigate('/register')}>Create account</Button>
              <Button kind="secondary" onClick={() => navigate('/login')}>Sign in</Button>
            </div>
            <p style={{ marginTop: '1.5rem' }}>
              Learn more about the app purpose in the documentation. <Link href="#">Read docs</Link>
            </p>
          </div>
        </Layer>
      </div>
    </Theme>
  );
}

