import {useMemo} from 'react';
import {useParams, Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem, Grid, Column, InlineNotification, Tag, Tile} from '@carbon/react';
import {ArrowLeft} from '@carbon/icons-react';
import {Shell} from '@/components/Shell';
import {useMembersList} from '@/hooks/use-members';
import {MemberStatus} from '@/domain/enums/MemberStatus';

const statusTagType: Record<MemberStatus, 'green' | 'red' | 'cyan' | 'gray'> = {
	[MemberStatus.InFullCommunion]: 'green',
	[MemberStatus.Restored]: 'green',
	[MemberStatus.UnderDiscipline]: 'red',
	[MemberStatus.Excluded]: 'red',
	[MemberStatus.Transferred]: 'cyan',
	[MemberStatus.AbsentOrWhereaboutsUnknown]: 'gray',
};

export default function MemberPage() {
	const {memberId} = useParams<{memberId: string}>();
	const membersQuery = useMembersList();

	const member = useMemo(
		() => membersQuery.data?.members.find((m) => m.memberId === memberId),
		[memberId, membersQuery.data?.members],
	);

	return (
		<Shell>
			<div style={{padding: '2rem'}}>
				<Breadcrumb noTrailingSlash>
					<BreadcrumbItem>
						<Link to="/members" style={{display: 'inline-flex', gap: 6, alignItems: 'center'}}>
							<ArrowLeft size={16}/> Membros
						</Link>
					</BreadcrumbItem>
				</Breadcrumb>

				{membersQuery.isLoading && (
					<InlineNotification
						kind="info"
						title="Carregando membro"
						subtitle="Aguarde um instante."
						lowContrast
						style={{marginTop: 12}}
					/>
				)}

				{membersQuery.isError && (
					<InlineNotification
						kind="error"
						title="Erro ao carregar membro"
						subtitle="Não foi possível carregar os detalhes."
						lowContrast
						style={{marginTop: 12}}
					/>
				)}

				{!membersQuery.isLoading && !member && (
					<InlineNotification
						kind="warning"
						title="Membro não encontrado"
						subtitle="Verifique se o link está correto."
						lowContrast
						style={{marginTop: 12}}
					/>
				)}

				{member && (
					<Tile style={{marginTop: 16}}>
						<h2 style={{marginTop: 0, display: 'flex', alignItems: 'center', gap: 8}}>
							{member.fullName}
							<Tag type={statusTagType[member.status] ?? 'gray'} size="sm">{member.status}</Tag>
						</h2>
						<p style={{marginTop: 0, color: 'var(--cds-text-secondary)'}}>CPF: {member.cpf}</p>

						<Grid condensed fullWidth style={{rowGap: '0.75rem'}}>
							<Column lg={8} md={4} sm={4}>
								<strong>Email</strong>
								<div>{member.email}</div>
							</Column>
							<Column lg={4} md={4} sm={4}>
								<strong>Telefone</strong>
								<div>{member.phone}</div>
							</Column>
							<Column lg={4} md={4} sm={4}>
								<strong>Admissão</strong>
								<div>{member.admissionType}</div>
							</Column>
							<Column lg={4} md={4} sm={4}>
								<strong>Classificação</strong>
								<div>{member.classification}</div>
							</Column>
							<Column lg={4} md={4} sm={4}>
								<strong>Escolaridade</strong>
								<div>{member.levelOfEducation}</div>
							</Column>
							<Column lg={6} md={4} sm={4}>
								<strong>Endereço</strong>
								<div>{member.address.street}, {member.address.number}</div>
								<div>{member.address.district}</div>
								<div>{member.address.city} / {member.address.state}</div>
								<div>{member.address.zipCode}</div>
							</Column>
							<Column lg={6} md={4} sm={4}>
								<strong>Data de nascimento</strong>
								<div>{new Date(member.birthdate).toLocaleDateString()}</div>
							</Column>
						</Grid>
					</Tile>
				)}
			</div>
		</Shell>
	);
}
