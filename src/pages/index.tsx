import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import AccountBalance from "~/components/AccountBalance";
import TransactionForm from "~/components/forms/TransactionForm";
import Layout from "~/components/layouts/Layout";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Layout>
        {!session ? (
          <p>You need to <Link href='/login'>login</Link> or <Link href='/register'>register</Link> to use this app.</p>
        ) : (
          <div className="grid grid-cols-2 gap-10 max-w-xl mx-auto">
            <AccountBalance />
            <TransactionForm />
          </div>
        )}
      </Layout>
    </>
  );
}