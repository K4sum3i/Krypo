"use client";

import { ShieldCheck } from "lucide-react";
import { TabsForms } from "./Components/TabsForms";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) redirect("/");

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_-20%,_rgba(255,_255,_255,_0.03)_0%,_transparent_50%)]">
      <div className="flex w-full max-w-[900px] h-[540px] bg-card border border-border rounded-xl overflow-hidden shadow-[0_24px_48px_rgba(0,_0,_0,_0.4)]">
        <div className="flex-1 bg-secondary p-12 flex flex-col justify-between border-r border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,_255,_255,_0.03)_1px,_transparent_1px),_linear-gradient(to_bottom,_rgba(255,_255,_255,_0.03)_1px,_transparent_1px)] bg-[length_24px_24px] z-0"></div>
          <div className="absolute -top-12 -left-12 w-[300px] h-[300px] bg-[radial-gradient(circle_at_center,_var(--primary),_transparent_70%)] opacity-15 z-0"></div>

          <div className="flex items-center gap-3 relative z-1">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-md flex items-center justify-center shadow-[0_4px_12px_rgba(0,_0,_0,_0.2)]">
              <div className="w-6 h-6 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-[-0.5px] text-foreground">
              Krypo
            </div>
          </div>

          <div className="text-base text-muted-foreground m-0 leading-6">
            <h2 className="text-[26px] font-semibold text-foreground m-0 leading-[1.2] tracking-[-0.02em]">
              Secure your digital identity.
            </h2>
            <p className="text-[15px] text-muted-foreground m-0 leading-6">
              The most advanced and intuitive password manager for your everyday
              needs.
            </p>
          </div>
        </div>
        <div className="flex-1 p-[40px_40px] flex flex-col justify-center bg-card">
          <TabsForms />
        </div>
      </div>
    </div>
  );
}
