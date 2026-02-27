"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { formSchema } from "./FormAddElement.form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, Earth, Eye, EyeOff, RefreshCcw } from "lucide-react";
import { copyClipboard } from "@/lib/copyClipboard";
import { useState } from "react";
import { generatePassword } from "@/lib/generatePassword";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { sileo } from "sileo";
import { useRouter } from "next/navigation";

export function FormAddElement() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeElement: "",
      isFavourite: false,
      name: "",
      directory: "",
      username: "",
      password: "",
      urlWebsite: "",
      notes: "",
      userId: "asdasdas",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/items", values);
      sileo.success({
        title: "Success",
        description: "Item created",
      });

      form.reset({
        typeElement: "",
        isFavourite: false,
        name: "",
        directory: "",
        username: "",
        password: "",
        urlWebsite: "",
        notes: "",
        userId: "asdasdas",
      });

      router.refresh();
    } catch (error) {
      sileo.error({
        title: "Error",
        description: "Failed to create item",
      });
    }
  };

  const generateRandomPassword = () => {
    const password = generatePassword();
    form.setValue("password", password);
  };

  const updateUrl = () => {
    form.setValue("urlWebsite", window.location.href);
  };

  return (
    <div className="flex gap-8 overflow-y-auto">
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-10">
          <div className="flex flex-col gap-5 h-full">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-[0.5px] mb-1">
              Site Information
            </h3>
            <FieldGroup>
              <Controller
                name="typeElement"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-typeElement">
                      Type of element
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={field.disabled}
                    >
                      <SelectTrigger
                        id="form-rhf-demo-typeElement"
                        aria-invalid={fieldState.invalid}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      >
                        <SelectValue placeholder="Select type of element for your password" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Inicio de sesión">
                          Inicio de sesión
                        </SelectItem>
                        <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                        <SelectItem value="Identidad">Identidad</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter site name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="urlWebsite"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-username">
                      Website URL
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-rhf-demo-urlWebsite"
                        aria-invalid={fieldState.invalid}
                        placeholder="https://"
                        autoComplete="off"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                        <Earth
                          className="text-muted-foreground cursor-pointer"
                          size={18}
                          onClick={updateUrl}
                        />
                      </div>
                    </div>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="directory"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-directory">
                      Directory
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={field.disabled}
                    >
                      <SelectTrigger
                        id="form-rhf-demo-directory"
                        aria-invalid={fieldState.invalid}
                        ref={field.ref}
                        onBlur={field.onBlur}
                      >
                        <SelectValue placeholder="Select a folder..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Social">Social</SelectItem>
                        <SelectItem value="Arts">Arts</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="notes"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      className="text-sm font-medium text-card-foreground flex justify-between"
                      htmlFor="form-rhf-demo-notes"
                    >
                      Notes
                      <span className="text-muted-foreground font-normal">
                        Optional
                      </span>
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="form-rhf-demo-notes"
                      aria-invalid={fieldState.invalid}
                      placeholder="Add any additional context or security questions here..."
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>

          <div className="flex flex-col gap-5 h-full">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-[0.5px] mb-1">
              Credentials
            </h3>
            <FieldGroup>
              <Controller
                name="isFavourite"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="form-rhf-demo-isFavourite"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-username">
                      Username
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id="form-rhf-demo-username"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter username"
                        autoComplete="off"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                        <Copy
                          className="text-muted-foreground cursor-pointer"
                          size={18}
                          onClick={() => {
                            /* NO FUNCIONA EL TOAST */
                            copyClipboard(field.value);
                          }}
                        />
                      </div>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <FieldGroup>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id="form-rhf-demo-password"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter password"
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
                        <Copy
                          className="text-muted-foreground cursor-pointer"
                          size={18}
                          onClick={() => {
                            /* NO FUNCIONA EL TOAST */
                            copyClipboard(field.value);
                          }}
                        />
                      </div>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              className="group"
              onClick={(e) => {
                e.preventDefault();
                generateRandomPassword();
              }}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <RefreshCcw
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </div>
              Auto-Generate Password
            </Button>
          </div>
        </div>
        <div className="mt-5 py-5 border-t border-border flex justify-end gap-3 bg-background">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Add Password</Button>
        </div>
      </form>
    </div>
  );
}
