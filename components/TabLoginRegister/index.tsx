import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "components/log-in-form";
import RegisterForm from "components/register-form";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { hideTabSignInRegister } from "@/slices/tabSignInRegisterSlice";
const TabLoginRegister = () => {
    const dispatch = useDispatch();


  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 bg-black text-white">
        <TabsTrigger value="account">Sign in</TabsTrigger>
        <TabsTrigger value="password">Sign up</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
            <div className="flex justify-end">
                <X className="hover:cursor-pointer" onClick={() => dispatch(hideTabSignInRegister())}/>
            </div>
          <CardHeader className="text-center">
            <CardTitle>Log in</CardTitle>
            <CardDescription>
              You can log in with username and password!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LoginForm />
          </CardContent>    
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
        <div className="flex justify-end">
                <X className="hover:cursor-pointer" onClick={() => dispatch(hideTabSignInRegister())}/>
            </div>
          <CardHeader className="text-center">
            <CardTitle >Register</CardTitle>
            <CardDescription>
              Register a account for your journey!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <RegisterForm></RegisterForm>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default TabLoginRegister;
