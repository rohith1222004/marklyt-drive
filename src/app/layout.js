import './globals.css';
import { Inter as FontSans } from "next/font/google";
import { cn } from '../lib/utils';
import TopBar from '../components/TopBar';
import { ClerkProvider } from '@clerk/nextjs';
import NavigationMenu from '../components/NavigationMenu';


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
   <ClerkProvider>
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
            <div className='flex h-full w-full'>
          <NavigationMenu className="h-full" />
          <div className='flex-1 flex flex-col h-full'>
            <TopBar />
            <div className='flex-1 p-4 overflow-auto'>
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
