import { getServerSession } from "next-auth";
import { HeaderMain } from "./Components/HeaderMain";
import { AppSidebar } from "@/components/Shared/Sidebar/AppSidebar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { DataTable } from "./Components/DataTable";
import { Analytics } from "./Components/Analytics";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { TrafficDevice } from "./Components/Analytics/componets/TrafficDevice";

export default async function page() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email,
    },
    include: {
      elements: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user || !user.elements) redirect("/");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 62)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={user} />
      <SidebarInset>
        <HeaderMain userId={user?.id} />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-6 md:gap-6 md:py-6">
              <Analytics />
              {/*               <div className="px-4">
                <TrafficDevice />
              </div> */}
              <DataTable data={user.elements} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
