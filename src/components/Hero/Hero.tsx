import { Heading } from '@/components';
import { HeroProps } from './Hero.types';

export default function Hero({
	children,
	title = '',
	description = '',
}: HeroProps) {
	return (
		<section className="flex flex-col items-center l-section gap-y-5 sm:gap-y-6 lg:gap-y-7">
			<Heading title={title} />

			{description && (
				<p className="text-neutral-500 text-center max-w-prose">
					{description}
				</p>
			)}

			<div className="mx-auto flex justify-center flex-wrap gap-x-8 gap-y-3">
				{children}
			</div>
		</section>
	);
};