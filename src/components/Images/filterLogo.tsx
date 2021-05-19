import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

interface IFilterLogoProps {
  filename: string,
  alt?: string,
  cat?: string
};

const FilterLogo: React.FC<IFilterLogoProps> = ({ filename }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              publicURL
            }
          }
        }
      }
    `}

    render={(data) => {
      const image = data.images.edges.find((n: any) => n.node.relativePath.includes(filename));
      if (!image) return null;
      return <img className="cause-filter-logo" alt={filename} src={image.node.publicURL} name={filename} />;
    }}
    
  />
);

export default FilterLogo;