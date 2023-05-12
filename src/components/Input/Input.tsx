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
				htmlFor={name}
				className="text-white"
			>
				{ label }
			</label>

			<input
				onChange={(e) => onChange(e.target.value)}
				className="mt-1.5 h-14 w-full appearance-none rounded-full border border-neutral-700 bg-neutral-800 px-6 text-white shadow-inner placeholder:text-neutral-600 focus:border-purple-500 focus:outline-none"
				placeholder={placeholder}
				autoComplete="off"
				type="email"
				id={name}
				name={name}
			/>
		</div>
	);
};