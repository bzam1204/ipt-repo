import { Button, Form, FormGroup, InlineLoading, PasswordInput, TextInput, Tile, Theme, InlineNotification } from '@carbon/react';
import { useState } from 'react';
import { useRegisterAccount } from '@/hooks/use-register';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const { mutateAsync, isPending, isError, isSuccess } = useRegisterAccount();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await mutateAsync({ firstName, lastName, email, cpf, password });
    navigate('/login', { replace: true });
  }

  return (
    <Theme theme="g10">
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100dvh', padding: '2rem' }}>
        <Tile style={{ width: 520 }}>
          <h2 style={{ marginBottom: 16 }}>Create your account</h2>
          {isError && (
            <InlineNotification
              kind="error"
              title="Registration failed"
              subtitle="Please verify your data and try again."
              lowContrast
              style={{ marginBottom: 12 }}
            />
          )}
          {isSuccess && (
            <InlineNotification
              kind="success"
              title="Account created"
              subtitle="Redirecting you to sign in..."
              lowContrast
              style={{ marginBottom: 12 }}
            />
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup legendText="Your information">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <TextInput
                  id="firstName"
                  labelText="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  required
                />
                <TextInput
                  id="lastName"
                  labelText="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  required
                />
              </div>
              <TextInput
                id="email"
                labelText="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
              <TextInput
                id="cpf"
                labelText="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.currentTarget.value)}
                required
              />
              <PasswordInput
                id="password"
                labelText="Password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </FormGroup>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
              <Button kind="primary" type="submit" disabled={isPending}>
                {isPending ? <InlineLoading description="Creating account..." /> : 'Create account'}
              </Button>
              <Link to="/login">Already have an account? Sign in</Link>
            </div>
          </Form>
        </Tile>
      </div>
    </Theme>
  );
}

