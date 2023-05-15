import { EmptyStateProps } from './EmptyState.types';

export default function EmptyState({
	message = '',
	icon = null,
}: EmptyStateProps) {
	return (
		<div className="flex max-w-prose flex-col items-center gap-y-3 px-4 py-8 text-center">
			{icon ? (
				icon
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12 text-neutral-600">
					<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
				</svg>
			)}

			<p className="text-sm text-neutral-500">
				{ message }
			</p>
		</div>
	);
};