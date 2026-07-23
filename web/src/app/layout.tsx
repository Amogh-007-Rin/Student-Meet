import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/Providers";


export const metadata: Metadata = {
  title: "Student Meet",
  description: "A social platform connecting students for verified offline meetups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
