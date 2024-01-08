import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

import { transactionSchema } from "~/validation/transaction";

export const transactionsRouter = createTRPCRouter({
  fetchAll: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.transaction.findMany({
        where: { userId: ctx.session.user.id }
      })
    }),
  getBalance: protectedProcedure
    .query(async ({ ctx }) => {
      const query = await ctx.db.transaction.aggregate({
        _sum: {
          amount: true
        },
        where: {
          userId: ctx.session.user.id
        }
      })

      return query._sum.amount?.toString() ?? '0';
    }),
  create: protectedProcedure
    .input(transactionSchema)
    .mutation(async ({ input, ctx }) => {
      const { amount } = input;

      const transaction = await ctx.db.transaction.create({
        data: {
          userId: ctx.session.user.id,
          amount,
        }
      })

      return {
        status: 201,
        message: "Transaction created successfully",
        transaction
      };
    }),
});