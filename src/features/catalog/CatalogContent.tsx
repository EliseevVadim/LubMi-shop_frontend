import React from 'react';
import Catalog from "../../components/catalog/Catalog";

const CatalogContent = () => {

  return (
    <div className='catalog-page'>
      <div className="catalog-page-catalog">
        <Catalog />
      </div>
    </div>
  );
};

export default CatalogContent;
