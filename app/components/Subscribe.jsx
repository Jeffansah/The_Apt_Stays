"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import validator from "email-validator";

const Subscribe = () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      if (email === "" || email.trim() === "") {
        toast({
          title: "Uh oh!",
          description: "Please enter your email",
          className: "bg-red-400 text-white border-none",
        });
        setLoading(false);
        return;
      }

      if (!validator.validate(email)) {
        toast({
          title: "Uh oh!",
          description: "Please enter a valid email",
          className: "bg-red-400 text-white border-none",
        });
        setLoading(false);
        return;
      }

      if (!checked) {
        toast({
          title: "Uh oh!",
          description: "Please agree to the privacy policy",
          className: "bg-red-400 text-white border-none",
        });
        return;
      }

      setLoading(true);

      const res = await fetch("https://aptapihosted.onrender.com/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        toast({
          title: "Success!",
          description: "You have been subscribed",
          className: "bg-green-400 text-white border-none",
        });
        setEmail("");
        setChecked(false);
        setLoading(false);
      } else {
        console.error(error);
        toast({
          title: "Uh oh!",
          description: "Something went wrong",
          className: "bg-red-400 text-white border-none",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh!",
        description: "Something went wrong",
        className: "bg-red-400 text-white border-none",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="flex justify-between pb-1 border-b border-b-white">
        <Input
          type="email"
          className="flex-1 bg-transparent border-none placeholder:text-gray-300 focus:ring-0 focus:outline-none text-white"
          placeholder="Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          onClick={handleSubmit}
          className="flex-1 flex gap-2 items-center justify-end group max-w-max cursor-pointer"
        >
          <Button className="bg-transparent hover:bg-transparent p-0 border-none heading-text text-sm text-white tracking-wide">
            {loading ? "Sending..." : "Subscribe"}
          </Button>
          <Image
            src="/images/send.png"
            width={24}
            height={24}
            alt="send"
            className="w-5 h-5 group-focus:opacity-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300 ease-in-out"
          />
        </div>
      </div>
      <div className="max-w-max flex gap-2 items-center">
        <Input
          type="checkbox"
          className=""
          onChange={() => setChecked(!checked)}
        />
        <p className="text-white text-xs text-nowrap">
          I agree to the Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
