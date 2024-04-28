"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { login, registerUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
  fullName: string;
  email: string;
  password: string;
};

var passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage("");
    const { fullName, email, password } = data;

    const response = await registerUser(fullName, email, password);

    if (!response.ok) {
      setErrorMessage(response.message);
      return;
    }

    const loginResponse = await login(email.toLocaleLowerCase(), password);
    if(!loginResponse.ok){
      setErrorMessage(loginResponse.message);
      return;
    }
    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col">
      <label htmlFor="name">Full Name</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.fullName,
        })}
        type="text"
        autoFocus
        {...register("fullName", { required: true })}
      />
      <label htmlFor="email">Email</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />

      <label htmlFor="email">Password</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
          "border-red-500": !!errors.password,
        })}
        type="password"
        {...register("password", {
          required: true,
          minLength: 8,
          pattern: passwordRegex,
        })}
      />
      {errors.password && (
        <span className="text-red-500 text-sm text-center p-2 fade-in">
          Your password must contain at least one lowercase letter, one
          uppercase letter, one digit, one special character, and be at least 8
          characters long.
        </span>
      )}

      <span className="text-red-500 text-sm text-center p-2 fade-in">
        {errorMessage}
      </span>

      <button className="btn-primary">CREATE ACCOUNT</button>

      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">OR</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        SIGN IN
      </Link>
    </form>
  );
};
