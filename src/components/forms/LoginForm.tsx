import type { LoginSchema } from "~/validation/auth";

import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Input from "./Input";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    const login = await signIn("credentials", { ...data, callbackUrl: "/",  redirect: false });

    setError(!!login?.error);

    if (login?.ok) {
      await router.push('/');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 card">
        <h2 className="text-white text-xl text-center">Login</h2>
        {error && (
          <p className="text-center text-red-600">Login failed, try again!</p>
        )}
        <Input
          label="Email"
          type="email"
          className="rounded border py-1 px-4"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <Input
          label="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
