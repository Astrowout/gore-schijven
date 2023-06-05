import { SelectProps as RadixSelectProps } from '@radix-ui/react-select';

export interface SelectProps extends RadixSelectProps {
    options: string[];
    name: string;
    className?: string;
}