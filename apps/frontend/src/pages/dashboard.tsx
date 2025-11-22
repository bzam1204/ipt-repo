import {Button, Theme, Tile} from '@carbon/react';
import {useAuth} from '@/providers/auth-provider';
import {Shell} from "@/components/Shell.tsx";



export default function DashboardPage() {
	const {clearSession} = useAuth();
	return (
		<Theme theme="g10">
			<Shell>
				<div style={{display: 'grid', placeItems: 'center', minHeight: '100dvh', padding: '2rem'}}>
					<Tile style={{width: 640}}>
						<h2 style={{marginBottom: 16}}>Painel</h2>
						<p>Bem-vindo! O painel estará disponível em breve.</p>
						<div style={{marginTop: 16}}>
							<Button kind="ghost" onClick={clearSession}>Sair</Button>
						</div>
					</Tile>
				</div>
			</Shell>
		</Theme>
	);
}
