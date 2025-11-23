export interface PaginationMeta {
	total: number;
	page: number;
	perPage: number;
	totalPages: number;
}

export interface PaginatedResult<T> {
	items: T;
	meta: PaginationMeta;
}

export interface QueryPaginationParams {
	page?: number;
	perPage?: number;
}

export function normalizePagination(params: QueryPaginationParams, defaults = {page: 1, perPage: 20, maxPerPage: 100}): {page: number; perPage: number} {
	const rawPage = Number(params.page ?? defaults.page);
	const rawPerPage = Number(params.perPage ?? defaults.perPage);
	const page = Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : defaults.page;
	const perPageCandidate = Number.isFinite(rawPerPage) && rawPerPage > 0 ? Math.floor(rawPerPage) : defaults.perPage;
	const perPage = Math.min(perPageCandidate, defaults.maxPerPage);
	return {page, perPage};
}

export function buildMeta(total: number, page: number, perPage: number): PaginationMeta {
	const totalPages = total === 0 ? 0 : Math.ceil(total / perPage);
	return {total, page, perPage, totalPages};
}
