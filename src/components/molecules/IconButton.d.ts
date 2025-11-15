import React from 'react';
import { type ButtonProps } from '../atoms/Buttons';
interface IconButtonProps extends Omit<ButtonProps, 'children'> {
    icon: React.ReactNode;
    label?: string;
}
export declare const IconButton: React.FC<IconButtonProps>;
export default IconButton;
