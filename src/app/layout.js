import './globals.css';
import { Inter as FontSans } from "next/font/google";
import { cn } from '@/lib/utils';
import NavigationMenu from '@/components/NavigationMenu';
import TopBar from '@/components/TopBar';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {/* <div className='flex bg-yellow-50'>
          <NavigationMenu />
          <div className='flex-1 flex flex-col'>
            <TopBar />
            <div className='flex-1 p-4'>
              {children}
            </div>
          </div>
        </div> */}
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
  );
}
