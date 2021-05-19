import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import About from "../components/About/aboutComponent";

const SecondPage: React.FC = () => (
  <Layout>
    <SEO title="About" />
    <About />
  </Layout>
);

export default SecondPage;