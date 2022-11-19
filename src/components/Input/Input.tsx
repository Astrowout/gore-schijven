import { InputProps } from "./Input.types";

export default function Input({
    className = "",
    name = "",
    label = "",
    placeholder = "",
    onChange = () => null,
}: InputProps) {
    return (
        <div className={`${className} flex flex-col w-full`}>
            <label
                htmlFor={name}
                className="text-white"
            >
                { label }
            </label>
    
            <input
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none h-14 px-6 mt-1.5 rounded-full border border-neutral-700 focus:border-purple-500 focus:outline-none text-white placeholder:text-neutral-600 bg-neutral-800 shadow-inner"
                placeholder={placeholder}
                autoComplete="off"
                type="email"
                id={name}
                name={name}
            />
        </div>
    );
};