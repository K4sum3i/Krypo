"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { FormUserEditProps } from "./FormUserEdit.types";
import { formSchema } from "./FormUserEdit.form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { UploadButton } from "@/lib/uploadThing";
import { sileo } from "sileo";
import axios from "axios";
import { useRouter } from "next/navigation";

export function FormUserEdit(props: FormUserEditProps) {
  const { user } = props;
  const router = useRouter();

  const [showUploadPhoto, setShowUploadPhoto] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      profileImage: user.profileImage || "",
      username: user.username || "",
      id: user.id || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/profile", values);
      sileo.success({
        title: "Profile updated",
      });

      router.push("/");
      setShowUploadPhoto(false);
      setPhotoUploaded(false);
    } catch (error) {
      sileo.error({
        title: "Something went wrong",
      });
    }
  };

  return (
    <form
      className="grid grid-cols-2 gap-6 items-start"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="profileImage"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="relative">
                <Image
                  src={user.profileImage ? user.profileImage : ""}
                  alt="Image profile"
                  className="rounded-full object-cover border-2 border-border"
                  width={120}
                  height={120}
                />
              </div>
              {showUploadPhoto ? (
                <UploadButton
                  {...field}
                  endpoint="profileImage"
                  onClientUploadComplete={(res) => {
                    form.setValue("profileImage", res?.[0].url);
                    setPhotoUploaded(true);
                  }}
                  onUploadError={(error: Error) => {
                    console.log(error);
                  }}
                />
              ) : (
                <Button onClick={() => setShowUploadPhoto((prev) => !prev)}>
                  Change Photo
                </Button>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <div className="flex flex-col gap-4">
        <FieldGroup className="flex flex-col gap-2">
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
                  placeholder="name"
                  autoComplete="off"
                />
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
                <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <FieldGroup className="flex flex-col gap-2">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-username">
                  Username
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-username"
                  aria-invalid={fieldState.invalid}
                  placeholder="username"
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

      <div className="flex justify-between items-center pt-4 border-t border-border col-span-2">
        <Button disabled>Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </form>
  );
}
