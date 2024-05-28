import "./globals.css";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider} from "@/components/ThemeProvider";


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
        
      </head>

        <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          
          <ConvexClientProvider>{children}</ConvexClientProvider> </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
