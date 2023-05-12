import Link from 'next/link';

import { HeadingProps } from './Heading.types';

export default function Heading({
	title = '',
}: HeadingProps) {
	return (
		<header className="flex -rotate-1 items-center justify-center rounded bg-purple-800 text-center font-display text-3xl tracking-wide shadow-xl sm:text-5xl md:text-6xl">
			<Link href="/">
				<h1 className="px-4 pt-2 text-white sm:pt-3.5">
					{ title }
				</h1>
			</Link>
		</header>
	);
};