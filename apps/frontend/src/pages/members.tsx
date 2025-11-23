import {Link} from 'react-router-dom';
import {
	Button,
	DataTable,
	DataTableSkeleton,
	InlineNotification,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	Tag,
	Tile,
} from '@carbon/react';
import {Add, ArrowRight} from '@carbon/icons-react';
import {Shell} from '@/components/Shell';
import {useMembersList} from '@/hooks/use-members';
import type {MemberRecord} from '@/gateways/members-gateway';
import {MemberStatus} from '@/domain/enums/MemberStatus';

const headers = [
	{key: 'fullName', header: 'Nome'},
	{key: 'email', header: 'E-mail'},
	{key: 'phone', header: 'Telefone'},
	{key: 'status', header: 'Status'},
	{key: 'admissionType', header: 'Admissão'},
	{key: 'classification', header: 'Classificação'},
	{key: 'location', header: 'Cidade/UF'},
	{key: 'actions', header: ''},
];

const statusTagType: Record<MemberStatus, 'green' | 'red' | 'cyan' | 'gray'> = {
	[MemberStatus.InFullCommunion]: 'green',
	[MemberStatus.Restored]: 'green',
	[MemberStatus.UnderDiscipline]: 'red',
	[MemberStatus.Excluded]: 'red',
	[MemberStatus.Transferred]: 'cyan',
	[MemberStatus.AbsentOrWhereaboutsUnknown]: 'gray',
};

function formatRows(members: MemberRecord[]) {
	return members.map((m) => ({
		id: m.memberId,
		fullName: m.fullName,
		email: m.email,
		phone: m.phone,
		status: m.status,
		admissionType: m.admissionType,
		classification: m.classification,
		location: `${m.address.city} / ${m.address.state}`,
	}));
}

export default function MembersPage() {
	const {data, isLoading, isError} = useMembersList();
	const rows = formatRows(data ?? []);

	return (
		<Shell>
			<div style={{padding: '2rem'}}>
				<Tile>
					<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
						<div>
							<h2 style={{margin: 0}}>Membros</h2>
							<p style={{margin: 0, color: 'var(--cds-text-secondary)'}}>Lista de membros recém admitidos.</p>
						</div>
						<Button kind="ghost" renderIcon={Add} size="md" disabled>
							Adicionar membro
						</Button>
					</div>

					{isError && (
						<InlineNotification
							kind="error"
							lowContrast
							title="Erro ao carregar membros"
							subtitle="Tente novamente em instantes."
							style={{marginBottom: 12}}
						/>
					)}

					{isLoading ? (
						<DataTableSkeleton
							headers={headers}
							showToolbar={false}
							compact
							rowCount={6}
							columnCount={headers.length}
						/>
					) : (
						<DataTable rows={rows} headers={headers} size="compact">
							{({rows, headers, getHeaderProps, getTableProps, getRowProps}) => (
								<TableContainer>
									<Table {...getTableProps()}>
										<TableHead>
											<TableRow>
												{headers.map((header) => (
													<TableHeader key={header.key} {...getHeaderProps({header})}>
														{header.header}
													</TableHeader>
												))}
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map((row) => (
												<TableRow key={row.id} {...getRowProps({row})}>
													{row.cells.map((cell) => {
														if (cell.info.header === 'fullName') {
															return (
																<TableCell key={cell.id}>
																	<Link to={`/members/${row.id}`} style={{color: 'inherit', textDecoration: 'none', fontWeight: 600}}>
																		{cell.value}
																	</Link>
																</TableCell>
															);
														}
														if (cell.info.header === 'status') {
															const tagType = statusTagType[cell.value as MemberStatus] ?? 'gray';
															return (
																<TableCell key={cell.id}>
																	<Tag type={tagType} size="sm">
																		{cell.value}
																	</Tag>
																</TableCell>
															);
														}
														if (cell.info.header === 'actions') {
															return (
																<TableCell key={cell.id}>
																	<Link to={`/members/${row.id}`} style={{textDecoration: 'none'}}>
																		<Button kind="ghost" size="sm" renderIcon={ArrowRight}>
																			Detalhes
																		</Button>
																	</Link>
																</TableCell>
															);
														}
														return <TableCell key={cell.id}>{cell.value}</TableCell>;
													})}
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							)}
						</DataTable>
					)}
				</Tile>
			</div>
		</Shell>
	);
}
