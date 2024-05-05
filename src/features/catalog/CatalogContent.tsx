import React, { FC, PropsWithChildren } from 'react';
import Catalog from "../../components/client/catalog/Catalog";

const CatalogContent: FC<PropsWithChildren<any>> = ({
                                                      products,
                                                      totalCount
                                                    }) => {

  return (
    <div className='catalog-page'>
      <div className="catalog-page-catalog">
        <Catalog
          products={products}
          replaceUrl={true}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
};

export default CatalogContent;
