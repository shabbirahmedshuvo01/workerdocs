import Sidebar from "@/components/shared/dashboard-part/Sidebar";
import TopNav from "@/components/shared/dashboard-part/TopNav";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`flex h-screen  overflow-x-hidden`}>
            <Sidebar />
            <div className="w-full flex flex-1 flex-col">
                <header className="h-16 lg:h-24 border-b border-gray-200">
                    <TopNav />
                </header>
                <main className="flex-1 overflow-auto p-6 bg-white ">{children}</main>
            </div>
        </div>
    );
}