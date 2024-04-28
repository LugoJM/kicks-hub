import type { Metadata } from "next";
import { Provider } from "@/components";
import { inter } from "@/config/fonts";
import "./globals.css";


export const metadata: Metadata = {
  title: {
    template : "%s - Kicks Hub",
    default : "Home - Kicks Hub"
  },
  description: "A virtual shoe selling store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
