import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@mui/joy";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import UserActions from "./UserActions";
import Link from "next/link";

const UsersView = async () => {
  let data;
  try {
    const response = await fetch("http://localhost:5000/api/users");
    data = await response.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div className="ml-auto flex items-center gap-2">
        <Link href="/admin/dashboard/users/add">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircleIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add New User
            </span>
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View and manage your users.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data ? (
                data.users.map((user) => (
                  <TableRow>
                    <TableCell className="hidden sm:flex space-x-2 items-center">
                      <Avatar>
                        <AvatarImage src="/" />
                        <AvatarFallback className="uppercase">
                          {user.firstname[0]}
                          {user.lastname[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-nowrap">
                        {user.firstname} {user.lastname}
                      </div>
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {user.isAdmin ? "Admin" : "Client"}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(user.createdAt), "dd MMM yy")}
                    </TableCell>
                    <TableCell className="flex justify-end">
                      <UserActions user={user} />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <CircularProgress color="neutral" variant="soft" size="sm" />
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default UsersView;
