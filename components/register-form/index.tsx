import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import AuthApi from "api-client/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/slices/authSlice";
import { Input } from "@/components/ui/Input";

const formSchema = z.object({
  username: z
    .string()
    .min(6, "Username must be at least 6 characters")
    .refine(
      async (username) => {
        const data = await AuthApi.checkUsername(username);
        console.log(data);
        return data.result === false;
      },
      { message: "Username already exists", path: ["username"] }
    ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
  rePassword: z
    .string()
    .min(1, "Confirm password is required"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
 });

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      rePassword: "",
    },
    
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setOnSubmit(true);
      const response = await AuthApi.register(values.username, values.password);
      if (response) {
        console.log("Response:", response);
        toast.success("Register successfully");
      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
    setOnSubmit(false);

    console.log("Form values:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500">Username</FormLabel>
              <FormControl>
                <Input
                  className="border-2 focus:border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-transparent hover:bg-slate-50"
                  placeholder="Student123"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500">Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="border-2 focus:border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-transparent hover:bg-slate-50"
                    type={showPassword ? "text" : "password"}
                    placeholder="@Student123"
                    {...field}
                  />
                </FormControl>
                {showPassword ? (
                  <Eye
                    onClick={handleShowPassword}
                    className="absolute top-1/2 translate-y-[-50%] right-4"
                  />
                ) : (
                  <EyeOff
                    onClick={handleShowPassword}
                    className="absolute top-1/2 translate-y-[-50%] right-4"
                  />
                )}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-500">Confirm Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    className="border-2 focus:border-gray-400 focus-visible:ring-offset-0 focus-visible:ring-transparent hover:bg-slate-50"
                    type={showPassword ? "text" : "password"}
                    placeholder="confirm password"
                    {...field}
                  />
                </FormControl>
                {showPassword ? (
                  <Eye
                    onClick={handleShowPassword}
                    className="absolute top-1/2 translate-y-[-50%] right-4"
                  />
                ) : (
                  <EyeOff
                    onClick={handleShowPassword}
                    className="absolute top-1/2 translate-y-[-50%] right-4"
                  />
                )}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={onSubmit}
            className={`w-full bg-blue-200 text-gray-600 hover:bg-blue-300 `}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
