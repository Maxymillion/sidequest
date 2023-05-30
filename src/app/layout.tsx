import "@/styles/globals.css";
import Link from "next/link";
import {Metadata} from "next";
import {Caveat, Racing_Sans_One} from 'next/font/google';
import {ThemeProvider} from "@/components/Theme/provider";
import {ModeToggle} from "@/components/Theme/toggle";
const handWriting = Caveat({ weight: "400", subsets: ["latin"], variable: '--font-write' });

const racingSansOne = Racing_Sans_One({ weight: "400", subsets: ["latin"], variable: '--font-rso' });
export const metadata: Metadata = {
  title: {
    default: 'Realm of Creativity',
    template: '%s | Sidequest',
  },
  description:
    'Soonish',
};

export default function RootLayout({children}: {
  children: React.ReactNode;

}) {
  return (
    <html lang="en" >
    <body
      className={`antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 ${racingSansOne.variable} ${handWriting.variable}`}
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="max-w-2xl mx-auto py-10 px-4">
          <header>
            <div className="flex items-center justify-between">
              <ModeToggle/>
              <nav className="ml-auto text-sm font-medium space-x-6">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </div>
      </ThemeProvider>
      </body>
    </html>
  );
}
