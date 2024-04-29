import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import { useUnit } from "effector-react";
import { $isOpenSearch, onChangeIsOpenSearch } from "../model/index";
import CrossIcon from "../../../assets/icons/CrossIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import { useRouter } from "next/router";

const Search = () => {

  const router = useRouter()
  const isOpenSearch = useUnit($isOpenSearch)


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      router.push('/search')
      console.log('Вызван поиск');
    }
  };

  return (
    <div className={`search-modal ${isOpenSearch ? 'search-modal-active' : ''}`}>

      <MaxWithLayout>
        <div className="search-modal-inside">
          <div className="search-modal-inside-input">
            <SearchIcon/>
            <input
              type="text"
              placeholder={'Поиск...'}
              onKeyPress={handleKeyPress}
              onKeyUp={handleKeyPress}
            />
          </div>
          <div
            className="search-modal-inside-find"
            onClick={() => onChangeIsOpenSearch(false)}
          >
            <CrossIcon />
          </div>
        </div>
      </MaxWithLayout>
    </div>
  );
};

export default Search;
