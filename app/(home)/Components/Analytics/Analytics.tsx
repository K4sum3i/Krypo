import { countPassword } from "@/lib/countPassword";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RepeatedPasswordsChart } from "./componets/RepeatedPasswordsChart/RepeatedPasswordsChart";
import { ViewsAnalyticsChart } from "./componets/ViewsAnalyticsChart";

export async function Analytics() {
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

  if (!user || !user.elements) {
    return redirect("/");
  }

  const { unique, repeated } = countPassword(user.elements);

  return (
    <div className="grid grid-cols-2 gap-5 px-4">
      <RepeatedPasswordsChart unique={unique} repeated={repeated} />
      <ViewsAnalyticsChart unique={unique} repeated={repeated} />
    </div>
  );
}
