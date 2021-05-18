import React from "react";
import Brand from "../Brand/brand";

interface IFooterProps {
  siteTitle: string
};

const Footer: React.FC<IFooterProps> = ({ siteTitle }) => (
  <footer>
    <div className="footer-elements-container">
      <Brand siteTitle={siteTitle} />
      <div className="footer-year">&nbsp;- {new Date().getFullYear()}</div>
    </div>
  </footer>
);

export default Footer;
