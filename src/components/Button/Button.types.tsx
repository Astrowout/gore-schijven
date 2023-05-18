import { ReactNode } from 'react';

export type ButtonProps = {
    children: ReactNode;
    className?: string;
    url?: string;
    isLoading?: boolean;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'default' | 'highlight';
}