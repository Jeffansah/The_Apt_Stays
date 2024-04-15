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
import { useState } from "react";
import { CircularProgress } from "@mui/joy";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      toast({
        title: "Success",
        description: "You have successfully added a new user",
        className: "bg-green-400 text-white",
      });
      setUserDetails({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        isAdmin: false,
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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex gap-8">
              <Input
                type="text"
                placeholder="First name"
                value={userDetails.firstname}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    firstname: e.target.value,
                  })
                }
                className="flex-1 focus:ring-none focus:ring-0 focus:outline-none"
              />
              <Input
                type="text"
                placeholder="Last name"
                value={userDetails.lastname}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, lastname: e.target.value })
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
            <div className="flex gap-8">
              <Input
                type="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, password: e.target.value })
                }
                className="flex-1 focus:ring-none focus:ring-0 focus:outline-none"
              />
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
    </>
  );
};

export default page;
