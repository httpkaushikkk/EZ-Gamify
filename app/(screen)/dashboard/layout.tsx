import Loader from "@/app/components/dashboard/loader";
import Navbar from "@/app/components/dashboard/navbar";
import SideBar from "@/app/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex bg-primary-extraLight">
        <div className="hidden lg:block">
          <SideBar />
        </div>
        <div className="flex-grow">
          <Navbar />
          {children}
        </div>
      </div>
    </section>
  );
}
