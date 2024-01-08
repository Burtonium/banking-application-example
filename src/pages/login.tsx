import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import Layout from "~/components/layouts/Layout";
import LoginForm from "~/components/forms/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - Nephelo Banking App</title>
        <meta name="description" content="Nephelo Banking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <LoginForm />
      </Layout>
    </>
  );
};

export default Login;
