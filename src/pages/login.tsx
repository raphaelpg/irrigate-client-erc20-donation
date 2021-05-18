import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import LoginForm from "../components/Forms/loginForm";

const LoginPage: React.FC = () => (
  <Layout>
    <SEO title="Login" />
    <LoginForm />
  </Layout>
);

export default LoginPage;