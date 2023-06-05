import { Status } from '@/types';
import { getStatusTagClasses } from '@/utils';
import clsx from 'clsx';

import { StatusTagProps } from './StatusTag.types';

export default function StatusTag({
	children,
	className = '',
	status = Status.TO_BE_REVIEWED,
}: StatusTagProps) {
	return (
		<p className={clsx('rounded-full border px-2.5 py-0.5 text-sm', className, getStatusTagClasses(status))}>
			{children}
		</p>
	);
};