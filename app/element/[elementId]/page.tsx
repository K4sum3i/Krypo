import { FormEditElement } from "@/components/Shared/FormEditElement/FormEditElement";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ElementPage({
  params,
}: {
  params: Promise<{ elementId: string }>;
}) {
  const session = await getServerSession();

  if (!session || !session.user?.email) return redirect("/");

  const { elementId } = await params;

  const element = await db.element.findUnique({
    where: {
      id: elementId,
    },
  });

  if (!element) return redirect("/");

  return (
    <div>
      <FormEditElement dataElement={element} />
    </div>
  );
}
