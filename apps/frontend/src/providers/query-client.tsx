import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {staleTime: 5 * 60 * 1000, retry: 1},
		mutations: {retry: 0},
	},
});

export function QueryProvider({children}: { children: React.ReactNode }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false}/>
			{children}
		</QueryClientProvider>
	);
}

