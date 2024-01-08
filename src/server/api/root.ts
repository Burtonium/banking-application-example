import { authRouter } from "./routers/auth";
import { transactionsRouter } from "./routers/transactions";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  transactions: transactionsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
