import { Button, Form, FormGroup, InlineLoading, PasswordInput, TextInput, Tile, Theme, InlineNotification } from '@carbon/react';
import { useState } from 'react';
import { useLogin } from '@/hooks/use-login';
import { useAuth } from '@/providers/auth-provider';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutateAsync, isPending, isError } = useLogin();
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tokens = await mutateAsync({ email, password });
    saveSession(tokens);
    navigate('/dashboard', { replace: true });
  }

  return (
    <Theme theme="g10">
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh', padding: '2rem' }}>
        <Tile style={{ width: 420 }}>
          <h2 style={{ marginBottom: 16 }}>Entrar</h2>
          {isError && (
            <InlineNotification
              kind="error"
              title="Falha no login"
              subtitle="Credenciais inválidas. Verifique os dados e tente novamente."
              lowContrast
              style={{ marginBottom: 12 }}
            />
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup legendText="Suas credenciais">
              <TextInput
                id="email"
                labelText="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <PasswordInput
                id="password"
                labelText="Senha"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </FormGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
              <Button kind="primary" type="submit" disabled={isPending}>
                {isPending ? <InlineLoading description="Entrando..." /> : 'Entrar'}
              </Button>
              <Link to="/register">Criar uma conta</Link>
            </div>
          </Form>
        </Tile>
      </div>
    </Theme>
  );
}
