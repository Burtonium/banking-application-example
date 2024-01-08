import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import Layout from "~/components/layouts/Layout";
import RegisterForm from "~/components/forms/RegisterForm";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register - Nephelo Banking App</title>
        <meta name="description" content="Registration for the Nephelo Banking App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RegisterForm />
      </Layout>
    </>
  );
};

export default Login;
