import "./globals.css";
import { Inter } from "next/font/google";
import ConvexClientProvider from "./ConvexClientProvider";
import { ClerkLoaded, ClerkLoading, ClerkProvider, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey="pk_test_dW5pdGVkLXN0b3JrLTIzLmNsZXJrLmFjY291bnRzLmRldiQ">
      <html lang="en">
        <head>
          <title>Ecommerce Performance Tracker</title>
          <meta name="description" content="Ecommerce Performance Tracker" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo2.png" />
        </head>

        <body className=" bg-background text-foreground antialiased">
       
     
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          
           
            <ConvexClientProvider>{children}</ConvexClientProvider>{" "}
          </ThemeProvider>
         
        </body>
      </html>
    </ClerkProvider>
  );
}
