"use client";

import { deleteCookie } from "cookies-next";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();

  const logout = () => {
    deleteCookie("access_token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  return (
    <div
      onClick={logout}
      className={`cursor-pointer flex mt-auto items-center gap-3 rounded-lg text-muted-foreground bg:text-primary   px-2 text-sm font-medium lg:px-8 transition-all hover:text-primary`}
    >
      <LogOutIcon className="h-4 w-4" />
      Sign out
    </div>
  );
};

export default SignOut;
