import React from 'react';
export type DropdownItem = {
    id: string | number;
    label: string;
    onSelect?: (id: string | number) => void;
};
export interface DropdownProps {
    label?: string;
    items: DropdownItem[];
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
