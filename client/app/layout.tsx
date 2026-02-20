import Sidebar from "./_components/Sidebar";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="h-full bg-black">
        <div className="h-screen">
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
