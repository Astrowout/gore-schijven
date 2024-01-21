import { ReactNode } from "react";

import { Button } from "@/components/Button";
import { Hero } from "@/components/Hero";

export const metadata = {
    title: "Admin | GORE SCHIJVEN™",
    robots: {
        index: false,
        follow: false,
    },
};

export default async function AdminLayout ({
    children,
}: {
    children: ReactNode
}) {
    return (
        <main className='flex grow flex-col'>
            <Hero title="GORE SCHIJVEN™">
                <Button url="/">
                    Terug naar home
                </Button>
            </Hero>

            {children}
        </main>
    );
}
