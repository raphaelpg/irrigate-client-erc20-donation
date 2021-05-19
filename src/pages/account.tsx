import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import DeleteUserForm from "../components/Forms/deleteUserForm";
import UserAssociations from "../components/Associations/userAssociations";

const AccountPage: React.FC = () => (
  <Layout>
    <SEO title="Account" />
    <UserAssociations />
    <DeleteUserForm />
  </Layout>
);

export default AccountPage;