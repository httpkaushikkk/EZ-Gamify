import Drawer from "@/app/components/sidebar/drawer";
import Headers from "@/app/components/sidebar/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex bg-primary-extraLight">
        <div className="hidden lg:block">
          <Drawer />
        </div>
        <div className="flex-grow">
          <Headers />
          {children}
        </div>
      </div>
    </section>
  );
}
