"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/joy";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    isAdmin: false,
  });
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const id = pathname?.split("/")[4];
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const id = pathname.split("/")[4];
        const response = await fetch(`http://localhost:5000/api/users/${id}`);
        const resData = await response.json();
        setData(resData);
        setUserDetails({
          firstName: resData.foundUser.firstname,
          lastName: resData.foundUser.lastname,
          username: resData.foundUser.username,
          email: resData.foundUser.email,
          isAdmin: resData.foundUser.isAdmin,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      toast({
        title: "Success",
        description: "You have successfully updated the user",
        className: "bg-green-400 text-white",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An errror occured",
        description: error,
        className: "Failed to update the user",
      });
      setLoading(false);
    }
  };

  return (
    <>
      {data ? (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Update User</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex gap-8">
                <Input
                  type="text"
                  placeholder="First name"
                  value={userDetails.firstName}
                  onChange={(e) =>
                    setUserDetails({
                      ...userDetails,
                      firstName: e.target.value,
                    })
                  }
                  className="flex-1 focus:ring-none focus:ring-0 focus:outline-none"
                />
                <Input
                  type="text"
                  placeholder="Last name"
                  value={userDetails.lastName}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, lastName: e.target.value })
                  }
                  className="flex-1 focus:ring-none focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="flex gap-8">
                <Input
                  type="text"
                  placeholder="Username"
                  value={userDetails.username}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, username: e.target.value })
                  }
                  className="flex-1 focus:ring-none focus:ring-0 focus:outline-none"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={userDetails.email}
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                  className="flex-1 focus:ring-none focus:ring-0 focus:outline-none"
                />
              </div>
              <Select
                onValueChange={(value) =>
                  setUserDetails({ ...userDetails, isAdmin: value })
                }
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Is an Admin?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={true}>Yes</SelectItem>
                    <SelectItem value={false}>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleSubmit} className="w-full">
              {loading ? (
                <CircularProgress color="neutral" variant="soft" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="w-full py-10 grid place-items-center">
          <CircularProgress color="neutral" variant="soft" size="lg" />
        </div>
      )}
    </>
  );
};

export default page;
