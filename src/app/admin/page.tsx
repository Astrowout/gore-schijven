import {
    AdminProposals,
    Loader,
} from '@/components';

export default function AdminPage() {
    return (
        <>
            {/* @ts-expect-error Async Server Component */}

            <AdminProposals title="Gore drops van onze viezeriken" />

            <Loader text="Sending feedback" />
        </>
    );
}
