import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderRoot, Nav, Brand } from './Header.styles';

export type NavItem = { to: string; label: string };

export type HeaderProps = {
	title?: string;
	nav?: NavItem[];
};

// Componente Header (organism) - textos e atributos em Português
const Header: React.FC<HeaderProps> = ({
	title = 'Brain Agriculture',
	nav = [],
}) => {
	return (
		<HeaderRoot role="banner" aria-label="Cabeçalho do site">
			<Brand>{title}</Brand>
			<Nav role="navigation" aria-label="Navegação principal">
				{nav.map((n) => (
					<Link key={n.to} to={n.to}>
						{n.label}
					</Link>
				))}
			</Nav>
		</HeaderRoot>
	);
};

export default Header;
