"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ---------------- ZOD SCHEMA ----------------
const loginSchema = z.object({
  email: z.string().email("Bruh... enter a real email 💀"),
  password: z.string().min(8, "Password must be 8+ chars, not your birth year"),
});

type LoginValues = z.infer<typeof loginSchema>;

// ---------------- COMPONENT ----------------
export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setServerError(null); // reset errors

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard", // redirect after login
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          setServerError(ctx.error.message);
        },
        onSettled: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="w-full max-w-sm mx-auto p-6 border rounded-xl bg-card shadow">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      {/* SHADCN FORM */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* EMAIL FIELD */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PASSWORD FIELD */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SERVER ERROR */}
          {serverError && (
            <p className="text-sm text-red-600">
              {serverError}
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
