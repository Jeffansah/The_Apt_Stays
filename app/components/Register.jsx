"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/store";
import validator from "email-validator";
import CircularProgress from "@mui/joy/CircularProgress";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Register() {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const setUserState = useAuthStore((state) => state.setUser);
  const userState = useAuthStore((state) => state.user);
  console.log(userState);

  const handleSubmit = async (e) => {
    e.preventDefault;

    try {
      setLoading(true);

      if (Object.values(userData).includes("")) {
        toast({
          title: "Uh oh!",
          description: "Please fill in all fields",
          className: "bg-red-400 text-white",
        });
        setLoading(false);
        return;
      }

      if (!validator.validate(userData.email)) {
        toast({
          title: "Uh oh!",
          description: "Please enter a valid email",
          className: "bg-red-400 text-white",
        });
        setLoading(false);
        return;
      }

      if (userData.password.length < 6) {
        toast({
          title: "Password too short",
          description: "Password must be at least 6 characters long",
          className: "bg-red-400 text-white",
        });
        setLoading(false);
        return;
      }

      const response = await fetch("https://misty-plum-hare.cyclic.app/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (data.status === 400) {
        toast({
          title: "Please try again",
          description: data.message,
          className: "bg-red-400 text-white",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Welcome",
        description: "You have successfully created an account",
        className: "bg-green-400 text-white",
      });
      setUserState(data.userDetails);
      localStorage.setItem("userData", JSON.stringify(data.userDetails));
      setCookie("access_token", data.token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[450px] gap-6">
        <div className="grid gap-2">
          <h1 className="text-5xl  font-heading">Join the APT family</h1>
          <p className="text-balance text-muted-foreground">
            Enter your details below to create an account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="flex gap-2 w-full">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="email" className="text-base">
                First name
              </Label>
              <Input
                id="firstname"
                type="text"
                placeholder="Enter your first name"
                required
                className="focus:outline-none focus:ring-0 py-6"
                onChange={(e) =>
                  setUserData({ ...userData, firstname: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="lastname" className="text-base">
                Last name
              </Label>
              <Input
                id="lastname"
                type="text"
                placeholder="Enter your last name"
                required
                className="focus:outline-none focus:ring-0 py-6"
                onChange={(e) =>
                  setUserData({ ...userData, lastname: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="username" className="text-base">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                required
                className="focus:outline-none focus:ring-0 py-6"
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="focus:outline-none focus:ring-0 py-6"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              required
              className="focus:outline-none focus:ring-0 py-6"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </div>
          <Button
            type="submit"
            className="w-full text-lg bg-theme font-heading py-6"
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress color="neutral" variant="soft" size="sm" />
            ) : (
              "Let's go"
            )}
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth?s=login" className="underline text-tertiary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
