import { PageLoader } from "@/components/PageLoader";

export default function LoadingPage () {
    return (
        <main className="flex h-screen w-screen grow overflow-hidden">
            <PageLoader />
        </main>
    );
}