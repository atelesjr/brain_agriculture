import React from 'react';
import type { ButtonProps } from './index';
export type IconAction = 'add' | 'edit' | 'delete';
export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
    action: IconAction;
    label?: string;
}
/**
 * IconButton atom — small button with icon + label
 * - Keeps a local "done" state when action is `delete` so the UI reflects the change
 */
declare const IconButton: React.ForwardRefExoticComponent<IconButtonProps & React.RefAttributes<HTMLButtonElement>>;
export default IconButton;
