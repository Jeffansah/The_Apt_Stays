"use client";

import {
  HomeIcon,
  LineChartIcon,
  ShoppingCartIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex-1 mt-4">
      <nav className="grid gap-6 items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="/admin/dashboard"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname === "/admin/dashboard"
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          } transition-all hover:text-primary`}
        >
          <LineChartIcon className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/admin/dashboard/bookings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname.includes("/admin/dashboard/bookings")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          } transition-all hover:text-primary`}
        >
          <ShoppingCartIcon className="h-4 w-4" />
          Bookings
        </Link>
        <Link
          href="/admin/dashboard/stays"
          className={`flex items-center gap-3 rounded-lg  px-3 py-2 ${
            pathname.includes("/admin/dashboard/stays")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          } transition-all hover:text-primary`}
        >
          <HomeIcon className="h-4 w-4" />
          Stays{" "}
        </Link>
        <Link
          href="/admin/dashboard/users"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
            pathname.includes("/admin/dashboard/users")
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          } transition-all hover:text-primary`}
        >
          <UsersIcon className="h-4 w-4" />
          Users
        </Link>
      </nav>
    </div>
  );
};

export default SidebarLinks;
