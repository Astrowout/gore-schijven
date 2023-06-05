import { AdminProposals } from '@/components';

export default async function AdminPage() {
	return (
		<>
			{/* @ts-expect-error Async Server Component */}

			<AdminProposals title="Gore drops van onze viezeriken" />
		</>
	);
}
