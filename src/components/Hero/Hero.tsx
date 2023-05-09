import { Heading } from '@/components';
import { HeroProps } from './Hero.types';

export default function Hero({
	children,
	title = '',
	description = '',
}: HeroProps) {
	return (
		<section className="flex flex-col items-center l-section">
			<Heading title={title} />

			{description && (
				<p className="text-neutral-500 text-center max-w-prose mt-8">
					{description}
				</p>
			)}

			<div className="mt-8 mx-auto flex justify-center flex-wrap gap-x-8 gap-y-4">
				{children}
			</div>
		</section>
	);
};