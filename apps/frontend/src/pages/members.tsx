import {useState, useMemo, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {
	Button,
	DataTable,
	DataTableSkeleton,
	InlineNotification,
	Pagination,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableHeader,
	TableRow,
	Tag,
	Tile,
	TableToolbar,
	TableToolbarContent,
	Dropdown,
	Search,
} from '@carbon/react';
import {Add, ArrowRight} from '@carbon/icons-react';
import {Shell} from '@/components/Shell';
import {useMembersList} from '@/hooks/use-members';
import type {MemberRecord} from '@/gateways/members-gateway';
import {MemberStatus} from '@/domain/enums/MemberStatus';
import {useDebounce} from '@/hooks/use-debounce';

const headers = [
	{key: 'fullName', header: 'Nome'},
	{key: 'email', header: 'E-mail'},
	{key: 'status', header: 'Status'},
	{key: 'classification', header: 'Classificação'},
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
		status: m.status,
		classification: m.classification,
	}));
}

export default function MembersPage() {
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [searchInput, setSearchInput] = useState('');
	const [statusFilter, setStatusFilter] = useState<MemberStatus | 'all'>('all');
	const [sortBy, setSortBy] = useState<string>('fullName');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [searchFocused, setSearchFocused] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	const debouncedSearch = useDebounce(searchInput, 500);
	const sortParam = `${sortDirection === 'desc' ? '-' : ''}${sortBy}`;
	const {data, isInitialLoading, isError, isFetching} = useMembersList({
		page,
		perPage: pageSize,
		search: debouncedSearch || undefined,
		status: statusFilter === 'all' ? undefined : statusFilter,
		sort: sortParam,
	});
	const rows = useMemo(() => formatRows(data?.members ?? []), [data]);
	const totalItems = data?.meta.total ?? 0;
	const showSkeleton = isInitialLoading && !data;

	useEffect(() => {
		if (searchFocused) searchRef.current?.focus();
	}, [searchFocused, isFetching, data, searchInput]);

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

					<TableToolbar>
						<TableToolbarContent>
							<Search
								size="sm"
								labelText="Buscar"
								placeholder="Buscar por nome, email..."
								value={searchInput}
								ref={searchRef}
								onFocus={() => setSearchFocused(true)}
								onBlur={() => setSearchFocused(false)}
								onChange={(e) => {
									setSearchInput(e.currentTarget.value);
									setPage(1);
								}}
							/>
							<Dropdown
								id="status-filter"
								label="Status"
								titleText=""
								size="sm"
								items={['all', ...Object.values(MemberStatus)]}
								selectedItem={statusFilter}
								onChange={({selectedItem}) => {
									setStatusFilter(selectedItem as MemberStatus | 'all');
									setPage(1);
								}}
								itemToString={(item) => (item === 'all' ? 'Todos os status' : item ?? '')}
							/>
							<Dropdown
								id="sort-by"
								label="Ordenar por"
								titleText=""
								size="sm"
								items={headers.filter((h) => h.key !== 'actions').map((h) => h.key)}
								selectedItem={sortBy}
								onChange={({selectedItem}) => {
									setSortBy(selectedItem as string);
									setPage(1);
								}}
								itemToString={(item) => headers.find((h) => h.key === item)?.header ?? String(item)}
							/>
							<Dropdown
								id="sort-direction"
								label="Direção"
								titleText=""
								size="sm"
								items={['asc', 'desc']}
								selectedItem={sortDirection}
								onChange={({selectedItem}) => setSortDirection(selectedItem as 'asc' | 'desc')}
								itemToString={(item) => (item === 'asc' ? 'Asc' : 'Desc')}
							/>
						</TableToolbarContent>
					</TableToolbar>

					{showSkeleton ? (
						<DataTableSkeleton
							headers={headers}
							showToolbar={false}
							compact
							rowCount={6}
							columnCount={headers.length}
						/>
					) : (
						<DataTable rows={rows} headers={headers} size="sm">
							{({rows, headers, getHeaderProps, getTableProps, getRowProps}) => (
								<TableContainer>
									<Table {...getTableProps()}>
										<TableHead>
											<TableRow>
												{headers.map((header) => (
													<TableHeader {...getHeaderProps({header})}>
														{header.header}
													</TableHeader>
												))}
											</TableRow>
										</TableHead>
										<TableBody>
											{rows.map((row) => (
												<TableRow {...getRowProps({row})}>
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
					{isFetching && !showSkeleton && (
						<div style={{padding: '0.5rem 0', color: 'var(--cds-text-secondary)', fontSize: 12}}>
							Atualizando...
						</div>
					)}
					<Pagination
						page={page}
						pageSize={pageSize}
						pageSizes={[10, 20, 50]}
						totalItems={totalItems}
						onChange={({page, pageSize}) => {
							setPage(page);
							setPageSize(pageSize);
						}}
					/>
				</Tile>
			</div>
		</Shell>
	);
}
