import "@/main.css";
import "atropos/atropos.min.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Kanit } from "next/font/google";
import { ReactNode } from "react";

import { Footer } from "@/components/Footer";
import { HeadingBanner } from "@/components/HeadingBanner";

export const runtime = "edge";

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`),
};

const kanitFont = Kanit({
    variable: "--font-kanit",
    weight: [
        "400",
        "600",
    ],
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout ({
    children,
}: {
  children: ReactNode
}) {
    const madeBy = (
        <>
            Made by the founding daddies:&nbsp;

            <a
                className="text-gray-600 hover:text-gray-500 hover:underline"
                href="https://www.linkedin.com/in/sjouwkevanparys/"
                rel="noopener noreferrer"
                target="_blank"
            >
                Sjouwke
            </a>
            ,&nbsp;

            <a
                className="text-gray-600 hover:text-gray-500 hover:underline"
                href="https://www.linkedin.com/in/lars-marginet-b07528215/"
                rel="noopener noreferrer"
                target="_blank"
            >
                Lars&nbsp;
            </a>

            &&nbsp;

            <a
                className="text-gray-600 hover:text-gray-500 hover:underline"
                href="https://astrowout.space"
                rel="noopener noreferrer"
                target="_blank"
            >
                Wout&nbsp;
            </a>

            in Belgium.
        </>
    );

    return (
        <html
            className={`${kanitFont.variable} bg-black`}
            lang="nl"
        >
            <body className="flex min-h-screen !max-w-none flex-col bg-gray-950/50 2xl:container selection:bg-purple-900 selection:text-white">
                <HeadingBanner title="GORE SCHIJVEN™️" />

                {children}

                <Footer
                    copyright="GORE SCHIJVEN™"
                    madeBy={madeBy}
                />

                <SpeedInsights />
            </body>
        </html>
    );
}
