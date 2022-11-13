import { Kanit } from '@next/font/google';

import { Footer } from "../components";
import "../styles/main.css";

const kanitFont = Kanit({
  variable: '--font-kanit',
  weight: ["400", "600"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const madeBy = (
      <>
        Made by the founding daddies: <a href="https://linkedin.com" target="_blank" className="hover:underline hover:text-neutral-500 text-neutral-600" rel="noopener noreferrer">Sjouwke</a>, <a href="https://linkedin.com" target="_blank" className="hover:underline hover:text-neutral-500 text-neutral-600" rel="noopener noreferrer">Lars</a> & <a href="https://woutvandesompele.be" target="_blank" className="hover:underline hover:text-neutral-500 text-neutral-600" rel="noopener noreferrer">Wout</a> in Belgium.
      </>
  )

    return (
        <html
          lang="en"
          className={`${kanitFont.variable} bg-black`}
        >
            <head />

            <body
              className="bg-neutral-900 bg-opacity-50 min-h-screen flex flex-col"
            >
              { children }

              <Footer
                copyright="GORE SCHIJVEN™"
                madeBy={madeBy}
              />
            </body>
        </html>
    )
}
