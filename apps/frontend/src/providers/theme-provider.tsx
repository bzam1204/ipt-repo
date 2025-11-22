import {createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode} from 'react';
import {Theme} from '@carbon/react';

type ThemeName = 'g10' | 'g100';

type ThemeContextValue = {
	theme: ThemeName;
	setTheme: (theme: ThemeName) => void;
	toggleTheme: () => void;
};

const THEME_STORAGE_KEY = 'app.theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}) {
	const [theme, setThemeState] = useState<ThemeName>('g10');

	useEffect(() => {
		const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
		if (stored === 'g10' || stored === 'g100') {
			setThemeState(stored);
		}
	}, []);

	useEffect(() => {
		document.documentElement.dataset.carbonTheme = theme;
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	}, [theme]);

	const setTheme = useCallback((next: ThemeName) => {
		setThemeState(next);
	}, []);

	const toggleTheme = useCallback(() => {
		setThemeState((prev) => (prev === 'g10' ? 'g100' : 'g10'));
	}, []);

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			toggleTheme,
		}),
		[theme, setTheme, toggleTheme],
	);

	return (
		<ThemeContext.Provider value={value}>
			<Theme theme={theme}>{children}</Theme>
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
	return ctx;
}
