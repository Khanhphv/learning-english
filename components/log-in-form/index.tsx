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
import httpClient from "api-client/httpClient";
import { toast } from "sonner";
import AuthApi from "api-client/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/slices/authSlice";
import { useRouter } from "next/router";
import { hideTabSignInRegister } from "@/slices/tabSignInRegisterSlice";
import { Input } from "@/components/ui/Input";

const formSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginForm = () => {
const router = useRouter();
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
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setOnSubmit(true);
      const response = await AuthApi.login(values.username, values.password);
      if (response) {
        console.log("Response:", response);
        localStorage.setItem("accessToken", response.result.accessToken);
        localStorage.setItem("userRole", response.result.role);
        dispatch(
          loginSuccess({
            accessToken: response.result.accessToken,
            userRole: response.result.userRole,
          })
        );
        dispatch(hideTabSignInRegister());
        toast.success("Login successfully");
      }
    } catch (error) {
      toast.error("Invalid username or password");
    }
    setOnSubmit(false);
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
                  placeholder="username"
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
                    placeholder="password"
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
            className={`w-full bg-red-400 text-white hover:bg-red-500 `}
          >
            Log in
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
