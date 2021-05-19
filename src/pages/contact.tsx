import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ContactForm from "../components/Forms/contactForm";

const SecondPage: React.FC = () => (
  <Layout>
    <SEO title="Contact" />
    <ContactForm />
  </Layout>
);

export default SecondPage;
