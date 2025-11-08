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
              Bem-vindo à Plataforma IPT
            </Heading>
            <p style={{ marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Construa, aprenda e colabore. Crie sua conta para começar ou entre para continuar.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button kind="primary" onClick={() => navigate('/register')}>Criar conta</Button>
              <Button kind="secondary" onClick={() => navigate('/login')}>Entrar</Button>
            </div>
            <p style={{ marginTop: '1.5rem' }}>
              Saiba mais sobre o propósito do aplicativo na documentação. <Link href="#">Ler documentação</Link>
            </p>
          </div>
        </Layer>
      </div>
    </Theme>
  );
}
