import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm";

export function TabsForms() {
  return (
    <Tabs className="mb-8 mt-5 w-full" defaultValue="signin">
      <TabsList className="flex bg-secondary p-1 rounded-md w-full">
        <TabsTrigger
          className="flex-1 text-center py-2.5 px-4 text-sm font-medium text-muted-foreground rounded-[calc(var(--radius-md)-2px)] cursor-pointer"
          value="signin"
        >
          Sign in
        </TabsTrigger>
        <TabsTrigger
          className="flex-1 text-center py-2.5 px-4 text-sm font-medium text-muted-foreground rounded-[calc(var(--radius-md)-2px)] cursor-pointer"
          value="signup"
        >
          Sign up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
