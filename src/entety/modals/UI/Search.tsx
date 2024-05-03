import React, { useEffect, useRef, useState } from 'react';
import { useUnit } from "effector-react";
import { $isOpenSearch, onChangeIsOpenMobMenu, onChangeIsOpenSearch } from "../model/index";
import CrossIcon from "../../../assets/icons/CrossIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Card from "../../../components/client/catalog/Card";
import CustomButton from "../../../components/client/common/CustomButton";
import CustomPagination from "../../../components/client/common/CustomPagination";

const Search = () => {

  const isOpenSearch = useUnit($isOpenSearch)

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (isOpenSearch) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpenSearch])

  return (
    <div className={`search-modal ${isOpenSearch ? 'search-modal-active' : ''}`}>

      <div className="search-modal-wrap-search">
        <div className="search-modal-inside">
          <div className="search-modal-inside-input">
            <SearchIcon />
            <input
              value={value}
              onChange={(e) => setValue(e?.target.value)}
              type="text"
              placeholder={'Поиск...'}
            />
          </div>
          <div
            className="search-modal-inside-find"
            onClick={() => onChangeIsOpenSearch(false)}
          >
            <CrossIcon />
          </div>
        </div>
      </div>

      <div className={`search-modal-wrap-result ${value && isOpenSearch ? 'search-modal-wrap-open' : ''}`}>
        <div className="search-modal-result">
         <h2>
           99 результатов по запросу: {value}
         </h2>
          <div className="search-modal-result-items">
            {
              Array.from(Array(10))?.map((item: any) =>
                <Card />
              )
            }
          </div>
          <div className="search-modal-result-buttons">
            <CustomButton
              title={'Загрузить еще'}
              padding={'24px 0'}
              maxWidth={"300px"}
              backColor={'rgba(255, 255, 255, 1)'}
              color={'rgba(34, 34, 34, 1)'}
              border={"2px solid rgba(34, 34, 34, 1)"}
            />
            <CustomPagination/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
