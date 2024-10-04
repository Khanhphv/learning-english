import { Button } from "@/components/ui/button";
import Menu from "components/menu";
import styles from "./_.module.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import TabLoginRegister from "components/TabLoginRegister";
import { RootState } from "@/stores";
import { useSelector, useDispatch } from "react-redux";
import { showTabSignInRegister } from "@/slices/tabSignInRegisterSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { loginSuccess, logout } from "@/slices/authSlice";
import useSession from "@/hooks/useSession";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthApi from "api-client/authApi";
import { toast } from "sonner";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { showTab } = useSelector(
    (state: RootState) => state.tabSignInRegister
  );
  const { isAuthenticated, accessToken } = useSelector((state: RootState) => state.auth);
  
  useSession();
  const handleTabs = () => {
    dispatch(showTabSignInRegister());
  };

  const handleLogout = async () => {
  
    const response = await AuthApi.logout(accessToken);
    console.log("Logout response:", response);
    if (response) {
      dispatch(logout());
    }
    toast.success("Logout successfully");
  }

  return (
    <div className="main">
      <header className={`${styles.header} flex`}>
        <div className="flex-1">
          <Menu />
        </div>
        <div className="flex flex-1 flex-col items-center"></div>
        <div className="flex-1 ">
          <div className="flex justify-end items-center mr-10">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="/avatar.gif" alt="User Avatar" />
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 absolute right-10">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator/>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>

                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleTabs}
                className="bg-white  text-black outline outline-2  hover:bg-gray-200"
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </header>
      {showTab && (
        <>
          <div className={styles.overlay}></div>
          <div className="absolute z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <TabLoginRegister />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;
