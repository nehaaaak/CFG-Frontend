"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, loginSchema } from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/use-login";

import { Button } from "@/components/ui/button";
import { Input as ShadcnInput } from "@/components/ui/input";
import PasswordInput from "../shared/password-input";

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data, {
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
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <ShadcnInput className="px-4 py-5 rounded-none" {...props} />
);
