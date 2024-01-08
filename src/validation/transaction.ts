import z from "zod";

export const transactionSchema = z.object({
  amount: z.string().regex(/^\d*\.?\d*$/),
});

export type TransactionSchema = z.infer<typeof transactionSchema>;