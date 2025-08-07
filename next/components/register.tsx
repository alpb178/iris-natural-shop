"use client";
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled
} from "@tabler/icons-react";
import { Container } from "./container";
import { Button } from "./elements/button";
import { Logo } from "./logo";

export const Register = () => {
  return (
    <Container className="flex flex-col justify-center items-center mx-auto max-w-lg h-screen">
      <Logo />
      <h1 className="my-4 font-bold text-xl md:text-4xl">
        Sign up for LaunchPad
      </h1>

      <form className="my-4 w-full">
        <input
          type="email"
          placeholder="Email Address"
          className="bg-primary mb-4 pl-4 border border-neutral-800 rounded-md outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800 w-full h-10 text-foreground text-sm placeholder-neutral-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-primary mb-4 pl-4 border border-neutral-800 rounded-md outline-none focus:outline-none active:outline-none focus:ring-2 focus:ring-neutral-800 w-full h-10 text-foreground text-sm placeholder-neutral-500"
        />
        <Button variant="muted" type="submit" className="py-3 w-full">
          <span className="text-sm">Sign up</span>
        </Button>
      </form>

      <Divider />

      <div className="flex sm:flex-row flex-col gap-4 w-full">
        <button className="flex flex-1 justify-center items-center space-x-2 bg-background hover:bg-white/80 shadow-[0px_1px_0px_0px_#00000040_inset] px-4 py-3 rounded-md text-black transition duration-200">
          <IconBrandGithubFilled className="w-4 h-4 text-foreground" />
          <span className="text-sm">Login with GitHub</span>
        </button>
        <button className="flex flex-1 justify-center items-center space-x-2 bg-background hover:bg-white/80 shadow-[0px_1px_0px_0px_#00000040_inset] px-4 py-3 rounded-md text-black transition duration-200">
          <IconBrandGoogleFilled className="w-4 h-4 text-foreground" />
          <span className="text-sm">Login with Google</span>
        </button>
      </div>
    </Container>
  );
};

const Divider = () => {
  return (
    <div className="relative py-8 w-full">
      <div className="bg-neutral-700 rounded-tl-xl rounded-tr-xl w-full h-px" />
      <div className="bg-neutral-800 rounded-bl-xl rounded-br-xl w-full h-px" />
      <div className="absolute inset-0 flex justify-center items-center bg-neutral-800 shadow-[0px_-1px_0px_0px_var(--neutral-700)] m-auto px-3 py-0.5 rounded-md w-5 h-5 text-xs">
        OR
      </div>
    </div>
  );
};
