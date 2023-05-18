import { SuccessProps } from './Success.types';

export default function Success({
	children,
	message = '',
}: SuccessProps) {
	return (
		<div className="flex max-w-md flex-col items-center py-4 text-center">
			<svg
				className="h-16 w-16 text-emerald-400"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>

			<p className="mt-3 leading-relaxed text-white">
				{ message }
			</p>

			<div className="mt-6">
				{ children }
			</div>
		</div>
	);
};