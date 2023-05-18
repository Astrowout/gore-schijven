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
	const classes = clsx('group relative inline-flex h-14 items-center justify-center px-6 transition-colors', className, {
		'text-neutral-400 hover:text-purple-500': variant === 'default',
		'text-purple-100 hover:text-white': variant === 'highlight',
	});

	if (url && isExternalUrl(url)) {
		return (
			<a
				className={classes}
				href={url}
				rel="noopener noreferrer"
				target="_blank"
			>
				{children}
			</a>
		);
	}

	if (url && !isExternalUrl(url)) {
		return (
			<Link
				className={classes}
				href={url}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			className={classes}
			disabled={isLoading}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
