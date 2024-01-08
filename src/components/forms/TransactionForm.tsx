import React, { FC } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";

import { api } from "~/utils/api";
import Input from "./Input";
import { TransactionSchema } from "~/validation/transaction";

const TransactionForm: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const utils = api.useUtils();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransactionSchema>();

  const mutation = api.transactions.create.useMutation({
    onError: (e) => setErrorMessage(e.message),
    onSuccess: async () => {
      reset();
      await utils.transactions.invalidate();
    },
  });

  const onSubmit: SubmitHandler<TransactionSchema> = async (data) => {
    setErrorMessage(undefined);
    await mutation.mutateAsync(data).catch((e) => {
      // Do nothin
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 card">
      <h2 className="text-xl text-center">Transaction</h2>
      {errorMessage && (
        <p className="text-center text-red-600">{errorMessage}</p>
      )}
      <Input
        label="Amount"
        className="rounded border py-1 px-4"
        type="numeric"
        pattern="^\d*\.?\d*$"
        {...register("amount", { required: true })}
      />
      {errors.amount && (
        <p className="text-center text-red-600">This field is required</p>
      )}
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default TransactionForm;
