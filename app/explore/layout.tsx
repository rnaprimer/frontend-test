import { Inter, Playfair_Display } from "next/font/google";
import LenisProvider from "@/components/explore/LenisProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`explore-theme ${inter.variable} ${playfair.variable} antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[#111] selection:text-[#FFFFFF]`}>
      {/* Global Vintage Texture System */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-halftone opacity-[0.03] mix-blend-multiply"></div>
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.05)]"></div>
      </div>
      <LenisProvider>{children}</LenisProvider>
    </div>
  );
}
