import { InputProps } from './Input.types';

export default function Input({
    className = '',
    name = '',
    label = '',
    placeholder = '',
    onChange = () => null,
}: InputProps) {
    return (
        <div className={`${className} flex w-full flex-col`}>
            <label
                className="text-white"
                htmlFor={name}
            >
                {label}
            </label>

            <input
                autoComplete="off"
                className="mt-1.5 h-14 w-full appearance-none rounded-full border border-neutral-700 bg-neutral-800 px-6 text-white shadow-inner placeholder:text-neutral-600 focus:border-purple-500 focus:outline-none"
                id={name}
                name={name}
                placeholder={placeholder}
                type="email"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};