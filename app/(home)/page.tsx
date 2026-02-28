import { getServerSession } from "next-auth";
import { HeaderMain } from "./Components/HeaderMain";
import { AppSidebar } from "@/components/Shared/Sidebar/AppSidebar";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { TableData } from "./Components/DataTable";

export default async function page() {
  const session = await getServerSession();
  console.log(session);

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

  if (!user || !user.username || !user.email || !user.elements) redirect("/");

  return (
    <div className="flex w-full h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 flex flex-col bg-background min-w-0">
        <HeaderMain
          userId={user?.id}
          username={user?.username}
          email={user?.email}
        />
        <div className="flex-1 px-8 overflow-y-auto flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-muted">
              Here is an overview of your security vault status.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
              b
            </div>
            <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
              b
            </div>
            <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
              b
            </div>
          </div>
          <div className="">
            <h2 className="text-lg font-semibold mb-4">Recently Added</h2>
            <TableData elements={user.elements} />
          </div>
        </div>
      </main>
    </div>
  );
}
