import {ReactNode} from 'react';
import {
	Content,
	Header,
	HeaderContainer,
	HeaderGlobalAction,
	HeaderGlobalBar,
	HeaderMenuButton,
	HeaderMenuItem,
	HeaderName,
	HeaderNavigation,
	SideNav,
	SideNavItems,
	SideNavLink,
	SkipToContent,
} from '@carbon/react';
import {Notification, Switcher} from '@carbon/icons-react';

type ShellProps = {
	children: ReactNode;
};

export function Shell({children}: ShellProps) {
	return (
		<HeaderContainer
			render={({isSideNavExpanded, onClickSideNavExpand}) => (
				<>
					<Header aria-label="IPT">
						<SkipToContent />
						<HeaderMenuButton
							aria-label={isSideNavExpanded ? 'Fechar menu' : 'Abrir menu'}
							isCollapsible
							onClick={onClickSideNavExpand}
							isActive={isSideNavExpanded}
						/>
						<HeaderName href="/dashboard" prefix="IPT">
							Painel
						</HeaderName>
						<HeaderNavigation aria-label="IPT">
							<HeaderMenuItem href="/dashboard">Dashboard</HeaderMenuItem>
						</HeaderNavigation>
						<HeaderGlobalBar>
							<HeaderGlobalAction aria-label="Notifications">
								<Notification size={20} />
							</HeaderGlobalAction>
							<HeaderGlobalAction aria-label="Switcher">
								<Switcher size={20} />
							</HeaderGlobalAction>
						</HeaderGlobalBar>
						<SideNav
							aria-label="Side navigation"
							expanded={isSideNavExpanded}
							isPersistent={false}
							onOverlayClick={onClickSideNavExpand}
						>
							<SideNavItems>
								<SideNavLink href="/dashboard" isActive>
									Dashboard
								</SideNavLink>
								<SideNavLink href="/members" isActive>
									Membros
								</SideNavLink>
							</SideNavItems>
						</SideNav>
					</Header>

					<Content id="main-content">{children}</Content>
				</>
			)}
		/>
	);
}
