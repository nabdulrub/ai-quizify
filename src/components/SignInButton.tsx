"use client";

import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Github } from "lucide-react";

type Props = {
  text: string;
};

const SignInButton = ({ text }: Props) => {
  return (
    <Button
      onClick={() => {
        signIn("github").catch(console.error);
      }}
    >
      {text}
      <Github className="ml-2" strokeWidth={2.5} size={20} />
    </Button>
  );
};

export default SignInButton;
