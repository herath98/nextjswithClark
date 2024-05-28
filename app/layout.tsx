import "./globals.css";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import {ClerkProvider} from "@clerk/nextjs";
import { ThemeModeScript } from "flowbite-react";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider  publishableKey="pk_test_dW5pdGVkLXN0b3JrLTIzLmNsZXJrLmFjY291bnRzLmRldiQ">
      <html lang="en">
      <head>
        <ThemeModeScript />
      </head>

        <body className={inter.className}>
          
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
