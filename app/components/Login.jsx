"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/store";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Login() {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const router = useRouter();

  const setUserState = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (Object.values(loginDetails).includes("")) {
        toast({
          title: "Uh oh!",
          description: "Please fill in all fields",
          className: "bg-red-400 text-white",
        });
        setLoading(false);
        return;
      }

      if (loginDetails.password.length < 6) {
        toast({
          title: "Password too short",
          description: "Password must be at least 6 characters long",
          className: "bg-red-400 text-white",
        });
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails),
      });

      const data = await response.json();

      if (data.status === 401) {
        toast({
          title: "Invalid credentials",
          description: data.message,
          className: "bg-red-400 text-white",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Welcome",
        description: "You have successfully logged in",
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
          <h1 className="text-5xl  font-heading">Sign in</h1>
          <p className="text-balance text-muted-foreground">
            Enter your details below to log into your account
          </p>
        </div>
        <div className="grid gap-4">
          <div className="flex gap-2 w-full">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="username" className="text-base">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                onChange={(e) =>
                  setLoginDetails({ ...loginDetails, username: e.target.value })
                }
                required
                className="focus:outline-none focus:ring-0 py-6"
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
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
              required
              className="focus:outline-none focus:ring-0 py-6"
            />
          </div>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-lg bg-theme font-heading py-6"
          >
            Let's go
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/auth?s=register" className="underline text-tertiary">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
