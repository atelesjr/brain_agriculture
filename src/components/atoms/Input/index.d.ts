import React from 'react';
declare const Input: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    required?: boolean;
    error?: string | null;
    children?: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>>;
export default Input;
