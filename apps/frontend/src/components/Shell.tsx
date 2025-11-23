import {type ReactNode} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Dashboard, UserMultiple, Notification, Switcher, Sun, Moon} from '@carbon/icons-react';
import {Content, Header, HeaderContainer, HeaderGlobalAction, HeaderGlobalBar, HeaderMenuButton, HeaderMenuItem, HeaderName, HeaderNavigation, SideNav, SideNavItems, SideNavLink, SkipToContent} from '@carbon/react';

import {useTheme} from '@/providers/theme-provider';

export function Shell({children}: ShellProps) {
	const {pathname} = useLocation();
	const navigate = useNavigate();
	const {theme, toggleTheme} = useTheme();

	const goTo = (path: string) => (event?: React.MouseEvent) => {
		event?.preventDefault();
		navigate(path);
	};

	return (
		<HeaderContainer
			render={({isSideNavExpanded, onClickSideNavExpand}) => (
				<>
					<Header aria-label="IPT">
						<SkipToContent/>
						<HeaderMenuButton aria-label={isSideNavExpanded ? 'Fechar menu' : 'Abrir menu'} isCollapsible onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
						<HeaderName href="/dashboard" prefix="IPT" onClick={goTo('/dashboard')}>Painel</HeaderName>
						<HeaderNavigation aria-label="IPT">
							<HeaderMenuItem href="/dashboard" onClick={goTo('/dashboard')}>Dashboard</HeaderMenuItem>
						</HeaderNavigation>
						<HeaderGlobalBar>
							<HeaderGlobalAction aria-label="Notifications">
								<Notification size={20}/>
							</HeaderGlobalAction>
							<HeaderGlobalAction aria-label="Alternar tema" onClick={toggleTheme}>{theme === 'g10' ? <Moon size={20}/> : <Sun size={20}/>}</HeaderGlobalAction>
							<HeaderGlobalAction aria-label="Switcher">
								<Switcher size={20}/>
							</HeaderGlobalAction>
						</HeaderGlobalBar>
						<SideNav isRail expanded={isSideNavExpanded} aria-label="Side navigation" isPersistent={false} onOverlayClick={onClickSideNavExpand}>
 							<SideNavItems>
								<SideNavLink href="/dashboard" onClick={goTo('/dashboard')} isActive={pathname.startsWith('/dashboard')} renderIcon={Dashboard}>Dashboard</SideNavLink>
								<SideNavLink href="/members" onClick={goTo('/members')} isActive={pathname.startsWith('/members')} renderIcon={UserMultiple}>Membros</SideNavLink>
							</SideNavItems>
						</SideNav>
					</Header>
					<Content id="main-content">{children}</Content>
				</>
			)}
		/>
	);
}

type ShellProps = {children: ReactNode;};
