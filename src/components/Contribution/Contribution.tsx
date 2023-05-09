import { ContributionProps } from './Contribution.types';

export default function Contribution({
	title = '',
	description = '',
	children = null,
}: ContributionProps) {
	return (
		<section className="flex flex-col items-center l-section gap-y-8">
			<header className="text-center max-w-prose flex flex-col items-center gap-y-3">
				<h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-semibold">
					{ title }
				</h1>

				<p className="text-neutral-500">
					{ description }
				</p>
			</header>

			{children}
		</section>
	);
};