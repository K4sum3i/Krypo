import { HeaderMain } from "./Components/HeaderMain";
import { Toaster } from "sileo";

export default function page() {
  return (
    <main className="flex-1 flex flex-col bg-background min-w-0">
      <Toaster position="bottom-right" />
      <HeaderMain />
      <div className="flex-1 px-8 overflow-y-auto flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted">
            Here is an overview of your security vault status.
          </p>
        </div>
      </div>
    </main>
  );
}
