"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/login", values);

      form.reset({
        email: "",
        password: "",
        rememberMe: false,
      });

      router.refresh();
    } catch (error) {}
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_-20%,_rgba(255,_255,_255,_0.03)_0%,_transparent_50%)]">
      <div className="flex w-full max-w-[900px] h-[520px] bg-card border border-border rounded-xl overflow-hidden shadow-[0_24px_48px_rgba(0,_0,_0,_0.4)]">
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
        <div className="flex-1 py-12 px-16 flex flex-col justify-center bg-card">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-2 text-card-foreground tracking-[-0.01em]">
              Welcome back
            </h1>
            <p className="text-sm text-muted-foreground m-0">
              Unlock your vault to access your passwords
            </p>
          </div>

          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="flex flex-col gap-2">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm font-medium text-card-foreground"
                      htmlFor="form-rhf-demo-email"
                    >
                      Email Address
                    </FieldLabel>
                    <div className="relative flex items-center">
                      <Input
                        className="w-full bg-input border border-border rounded-md px-3 py-4 text-foreground text-sm leading-[20px] flex items-center"
                        {...field}
                        id="form-rhf-demo-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="off"
                      />
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup className="flex flex-col gap-2">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm font-medium text-card-foreground"
                      htmlFor="form-rhf-demo-password"
                    >
                      Password
                    </FieldLabel>
                    <div className="relative flex items-center">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="w-full bg-input border border-border rounded-md px-3 py-4 text-foreground text-sm leading-[20px] flex items-center"
                        {...field}
                        id="form-rhf-demo-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="off"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                        {showPassword ? (
                          <EyeOff
                            className="text-muted-foreground cursor-pointer opacity-100 scale-100"
                            size={18}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          />
                        ) : (
                          <Eye
                            className="text-muted-foreground cursor-pointer opacity-100 scale-100"
                            size={18}
                            onClick={() => {
                              setShowPassword(!showPassword);
                            }}
                          />
                        )}
                      </div>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <div className="flex items-center justify-between mt-1 mb-2">
              <FieldGroup>
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="form-rhf-demo-rememberMe"
                          aria-invalid={fieldState.invalid}
                        />
                        <span className="flex text-sm text-muted-foreground">
                          Remember me
                        </span>
                      </div>
                    </Field>
                  )}
                />
              </FieldGroup>
              <span className="text-sm text-primary decoration-none font-medium cursor-pointer">
                Forgot password?
              </span>
            </div>

            <Button className="group" type="submit">
              Login
              <ArrowRight
                className="transition-all group-hover:translate-x-1"
                size={16}
              />
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-medium cursor-pointer"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
