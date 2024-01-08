import type { RegisterSchema } from "~/validation/auth";

import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { api } from "~/utils/api";
import Input from "./Input";
import Link from "next/link";

const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterSchema>();

  const mutation = api.auth.register.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: () => {
      setSuccess(true);
      reset();
    },
  });

  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync(data).catch((e) => {
      // Do nothin
    });
  };

  return (
    <div className="radius flex flex-col items-center gap-2 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 card">
        <h2 className="text-xl text-center">Register</h2>
        {success && (
          <p className="text center text-green-400">You've successfully registered, please <Link href='/login'>login</Link></p>
        )}
        {errorMessage && (
          <p className="text-center text-red-600">{errorMessage}</p>
        )}
        <Input
          label="Email"
          className="rounded border py-1 px-4"
          type="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <Input
          label="Password"
          className="rounded border py-1 px-4"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-center text-red-600">This field is required</p>
        )}
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
