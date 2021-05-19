import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import { AppContext } from "../context/AppContext";
import config from '../config/config';
import Header from "./Header/header";
import Footer from "./Footer/footer";
import { IAssociation } from '../interfaces/Association';
import { IFilter } from '../interfaces/Filter';
import associationService from '../services/associations.service';

const Layout: React.FC = ({ children }) => {
  
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const [ filters, setFilters ] = useState<IFilter[]>([]);
  const [ categories, setCategories ] = useState<string[]>([]);
  const [ locations, setLocations ] = useState<string[]>([]);
  const [ associations, setAssociations ] = useState<IAssociation[]>([]);

  const retrieveAssociationsList = () => {
    associationService.getAssociationsList()
    .then(resultData => {
      setAssociations(resultData.data)
    });
  };

  useEffect(() => {
    setFilters([...config.filters])
    setCategories([...config.filters[0].keys]);
    setLocations([...config.filters[1].keys]);
  }, []);

  return (
    <AppContext.Provider value={{ filters, categories, locations, associations, retrieveAssociationsList }} >
      <div className="app-container">
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <div className="main-container">
          <main>{children}</main>
        </div>
        <Footer siteTitle={data.site.siteMetadata?.title || `Title`} />
      </div>
    </AppContext.Provider>
  );
};

export default Layout;
