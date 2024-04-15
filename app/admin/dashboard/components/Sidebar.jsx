import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BellIcon,
  HomeIcon,
  LineChartIcon,
  LogOutIcon,
  Package2Icon,
  PackageIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import SidebarLinks from "./SidebarLinks";
import SignOut from "./SignOut";

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-background md:block w-[20%]">
      <div className="flex h-full max-h-screen flex-col gap-2 pb-8">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center text-2xl gap-2 font-semibold"
          >
            <span className="">APT</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <SidebarLinks />
        <SignOut />
      </div>
    </div>
  );
};

export default Sidebar;
