import FollowBar from "./_components/FollowBar";
import Model from "./_components/Model";
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
          {/* <Model isOpen title="Test Model" actionLabel="Submit" /> */}
          <div className="container h-full mx-auto xl:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
                {children}
              </div>
              <FollowBar />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
