import Link from 'next/link';
import clsx from 'clsx';

import { isExternalUrl } from '@/utils';
import { ButtonProps } from './Button.types';

export default function ButtonRoot({
	children = null,
	className = '',
	url = '',
	type = 'button',
	isLoading = false,
	onClick = () => null,
	variant = 'default',
}: ButtonProps) {
	const classes = clsx('group relative h-14 px-6 inline-flex justify-center items-center transition-colors', className, {
		'text-neutral-500 hover:text-purple-500': variant === 'default',
		'text-purple-100 hover:text-white': variant === 'highlight',
	});

	if (url && isExternalUrl(url)) {
		return (
			<a
				href={url}
				target="_blank"
				rel="noopener noreferrer"
				className={classes}
			>
				{children}
			</a>
		);
	}

	if (url && !isExternalUrl(url)) {
		return (
			<Link
				href={url}
				className={classes}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			onClick={onClick}
			type={type}
			disabled={isLoading}
			className={classes}
		>
			{children}
		</button>
	);
};
