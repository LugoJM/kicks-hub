"use client";

import { useEffect } from "react";
import Link from "next/link";
import { authenticate } from "@/actions";
import { useFormState, useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";

interface Props{
  callbackUrl : string | undefined;
}

export const LoginForm = ( { callbackUrl } : Props) => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  useEffect(() => {
    if(errorMessage === "Success"){
      if(!callbackUrl) {
        window.location.replace("/");
      } else{
        window.location.replace(callbackUrl);
      }
    }
  },[errorMessage, callbackUrl]);

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Email</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="email">Password</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <div
        className="flex h-8 items-center justify-center space-x-1 mb-2"
        aria-live="polite"
        aria-atomic="true"
      >
        {(errorMessage && errorMessage !== "Success")  && (
          <>
            <IoInformationOutline className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>
      <LoginButton />

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">OR</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        CREATE ACCOUNT
      </Link>
    </form>
  );
};


function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={clsx({
        "btn-primary": !pending,
        "btn-disabled": pending,
      })}
      disabled={pending}
    >
      CONTINUE
    </button>
  );
}