import { Link } from "gatsby";
import React from "react";
import IrrigateLogo2 from "../../images/irrigate-icon.png";

interface IBrandProps {
  siteTitle: string
};

const Brand: React.FC<IBrandProps> = ({siteTitle = ''}) => (
  <Link className="brand-container" to="/" >
    <img className="irrigate-logo" src={IrrigateLogo2} alt="Planete Earth Irrigate Logo"></img>
    <h1 className="brand">
      {siteTitle}
    </h1>
  </Link>
);

export default Brand;
