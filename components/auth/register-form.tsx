"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import { useRegister } from "@/hooks/auth/use-register";
import PasswordInput from "../shared/password-input";

export default function RegisterForm() {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const registerMutation = useRegister();

  const onSubmit = async (data: RegisterInput) => {
    registerMutation.mutate(data, {
      onError: (error: any) => {
        const field = error?.response?.data?.field;
        const message = error?.response?.data?.message;

        if (field) {
          form.setError(field, {
            type: "server",
            message,
          });
        }
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input placeholder="Full Name" {...form.register("full_name")} />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <Input placeholder="Email" {...form.register("email")} />
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <PasswordInput
          placeholder="Password"
          {...form.register("password")}
          className="px-4 py-5 rounded-none"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full rounded-none uppercase px-4 py-5"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <ShadcnInput className="px-4 py-5 rounded-none" {...props} />
);
