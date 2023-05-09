import { ReactNode } from 'react';

export type ButtonProps = {
    children: ReactNode;
    className?: string;
    isLoading?: boolean;
    url?: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'default' | 'highlight';
}