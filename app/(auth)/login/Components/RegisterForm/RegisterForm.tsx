"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  termsAndConditions: z.boolean(),
});

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      termsAndConditions: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
        termsAndConditions: values.termsAndConditions,
      }),
    });

    if (response.status === 200) {
      router.push("/");
      sileo.success({
        title: "Registro se ha realizado con exito",
      });
    } else {
      sileo.error({
        title: "Error al realizar el registro",
      });
    }
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2 text-card-foreground tracking-[-0.01em]">
          Create your vault
        </h1>
        <p className="text-sm text-muted-foreground m-0">
          Start securing your digital identity today
        </p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="flex flex-col gap-2">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  className="text-sm font-medium text-card-foreground"
                  htmlFor="form-rhf-demo-username"
                >
                  Username
                </FieldLabel>
                <div className="relative flex items-center">
                  <Input
                    className="w-full bg-input border border-border rounded-md py-3 px-3.5 text-foreground text-sm leading-[20px] flex items-center"
                    {...field}
                    id="form-rhf-demo-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your username"
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
                    className="w-full bg-input border border-border rounded-md py-3 px-3.5 text-foreground text-sm leading-[20px] flex items-center"
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
                    className="w-full bg-input border border-border rounded-md py-3 px-3.5 text-foreground text-sm leading-[20px] flex items-center"
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
              name="termsAndConditions"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="form-rhf-demo-termsAndConditions"
                      aria-invalid={fieldState.invalid}
                    />
                    <span className="flex text-sm text-muted-foreground">
                      I agree to the&nbsp;
                      <span className="text-primary decoration-none font-medium cursor-pointer">
                        Terms of Service&nbsp;
                      </span>
                      and&nbsp;
                      <span className="text-primary decoration-none font-medium cursor-pointer">
                        Privacy Policy
                      </span>
                    </span>
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </div>

        <Button className="group" type="submit">
          Create Vault
          <ArrowRight
            className="transition-all group-hover:translate-x-1"
            size={16}
          />
        </Button>
      </form>
    </>
  );
}
