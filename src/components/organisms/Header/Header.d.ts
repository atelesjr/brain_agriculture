import React from 'react';
export type NavItem = {
    to: string;
    label: string;
};
export type HeaderProps = {
    title?: string;
    nav?: NavItem[];
};
declare const Header: React.FC<HeaderProps>;
export default Header;
