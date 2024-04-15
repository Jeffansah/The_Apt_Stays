"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const pathLinks = pathname.split("/");

  return (
    <div className="flex items-center">
      <Breadcrumb className="hidden md:flex text-base">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href="#"
                className={`capitalize ${
                  !pathLinks[3] ? "text-foreground" : ""
                }`}
              >
                {pathLinks[2]}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className={`${!pathLinks[3] ? "hidden" : ""}`} />
          <BreadcrumbItem>
            <BreadcrumbPage asChild>
              <Link
                href="#"
                className={`${!pathLinks[3] ? "hidden" : ""} capitalize`}
              >
                {pathLinks[3] && pathLinks[3]}
              </Link>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative ml-auto flex-1 md:grow-0">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px] focus:ring-none focus:ring-0 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Header;
