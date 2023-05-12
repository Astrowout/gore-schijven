import clsx from 'clsx';
import ButtonRoot from './Button.root';
import { ButtonProps } from './Button.types';

export default function Button({
	children = null,
	variant = 'default',
	...props
}: ButtonProps) {
	return (
		<ButtonRoot
			{...props}
			variant={variant}
		>
			<span className={clsx('absolute inset-0 h-full w-full rounded-full border-x shadow-lg transition duration-200 group-hover:scale-x-110 group-hover:shadow-xl group-hover:shadow-purple-500/20', {
				'border-neutral-600 bg-neutral-900 group-hover:border-purple-500': variant === 'default',
				'border-purple-800 bg-purple-600 group-hover:border-purple-900': variant === 'highlight',
			})}
			></span>

			<span className="relative z-10 flex items-center gap-x-2">
				{children}

				{props.isLoading && (
					<svg className="h-4 w-4 animate-spin text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>

						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				)}
			</span>
		</ButtonRoot>
	);
};
