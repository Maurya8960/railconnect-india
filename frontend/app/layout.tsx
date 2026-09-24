import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import UserMenu from "@/components/UserMenu";
import Footer from "@/components/Footer";
import { TrainFront, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RailConnect",
  description: "Modern Railway Booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main Navbar */}
          <header className="w-full flex items-center justify-between p-4 md:px-8 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <TrainFront className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white hidden sm:block">
                RailConnect
              </span>
            </Link>

            {/* Desktop Menu Bar (Restored) */}
            <nav className="hidden lg:flex items-center gap-8 font-bold text-[14px] text-slate-600 dark:text-slate-300">
              <Link href="/search" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wide">Search Trains</Link>
              <Link href="/pnr" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wide">PNR Status</Link>
              <Link href="/track" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wide">Track Train</Link>
              <Link href="/charts" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase tracking-wide">Charts/Vacancy</Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 md:gap-4 shrink-0">
              <ThemeToggle />
              <UserMenu />
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </div>

          </header>
          
          {/* Page Content */}
          <main className="min-h-[calc(100vh-80px)]">
            {children}
          </main>

          {/* Footer (Restored) */}
          <Footer />

        </ThemeProvider>
      </body>
    </html>
  );
}
