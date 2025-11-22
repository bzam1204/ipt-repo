import {Button, Form, FormGroup, InlineLoading, PasswordInput, TextInput, Tile, InlineNotification} from '@carbon/react';
import {useState} from 'react';
import {useRegisterAccount} from '@/hooks/use-register';
import {useNavigate, Link} from 'react-router-dom';

export default function RegisterPage() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [cpf, setCpf] = useState('');
	const {mutateAsync, isPending, isError, isSuccess, error} = useRegisterAccount();
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		await mutateAsync({firstName, lastName, email, cpf, password});
		navigate('/login', {replace: true});
	}

	return (
		<section style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw'}}>
			<img src='src/assets/background-image.png' style={{flexGrow: 1, objectFit: 'cover', width: '100%', height: '100%'}}/>
			<div style={{display: 'grid', placeItems: 'center', minHeight: '100dvh', padding: '2rem'}}>
				<Tile style={{width: 520}}>
					<h2 style={{marginBottom: 16}}>Crie sua conta</h2>
					{isError && (
						<InlineNotification
							kind="error"
							title={error.message}
							subtitle={error.cause}
							lowContrast
							style={{marginBottom: 12}}
						/>
					)}
					{isSuccess && (
						<InlineNotification
							kind="success"
							title="Conta criada"
							subtitle="Redirecionando para a página de login..."
							lowContrast
							style={{marginBottom: 12}}
						/>
					)}
					<Form onSubmit={handleSubmit}>
						<FormGroup legendText="Suas informações">
							<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
								<TextInput
									id="firstName"
									labelText="Nome"
									value={firstName}
									onChange={(e) => setFirstName(e.currentTarget.value)}
									required
								/>
								<TextInput
									id="lastName"
									labelText="Sobrenome"
									value={lastName}
									onChange={(e) => setLastName(e.currentTarget.value)}
									required
								/>
							</div>
							<TextInput
								id="email"
								labelText="E-mail"
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
								labelText="Senha"
								value={password}
								onChange={(e) => setPassword(e.currentTarget.value)}
								required
							/>
						</FormGroup>
						<div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 12}}>
							<Button kind="primary" type="submit" disabled={isPending}>
								{isPending ? <InlineLoading description="Criando conta..."/> : 'Criar conta'}
							</Button>
							<Link to="/login">Já tem uma conta? Entre</Link>
						</div>
					</Form>
				</Tile>
			</div>
		</section>
	);
}
