"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const UserActions = ({ user }) => {
  const router = useRouter();

  const deleteOneUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex gap-6">
      <Button
        onClick={() => router.push(`/admin/dashboard/users/${user._id}`)}
        className="p-2 h-8 text-sm font-normal"
        size="sm"
      >
        Update User
      </Button>
      <Dialog>
        <DialogTrigger>
          <Button
            className="p-2 h-8 text-sm font-normal"
            size="sm"
            type="button"
            variant="outline"
          >
            Delete User
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              user and remove subsequent data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button className="" onClick={deleteOneUser} type="button">
              Yes
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserActions;
