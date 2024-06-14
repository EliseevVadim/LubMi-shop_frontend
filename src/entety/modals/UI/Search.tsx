import React, { useEffect, useRef, useState } from 'react';
import { useUnit } from "effector-react";
import { $isOpenSearch, onChangeIsOpenBucket, onChangeIsOpenMobMenu, onChangeIsOpenSearch } from "../model/index";
import CrossIcon from "../../../assets/icons/CrossIcon";
import SearchIcon from "../../../assets/icons/SearchIcon";
import Card from "../../../components/client/catalog/Card";
import CustomButton from "../../../components/client/common/CustomButton";
import CustomPagination from "../../../components/client/common/CustomPagination";
import { api } from "../../../api/ApiWithoutToken";
import { useDebounce } from "use-debounce";
import { Spin } from "antd";

const Search = () => {

  const isOpenSearch = useUnit($isOpenSearch)
  const ref = useRef<any>(null);


  const [data, setData] = useState<any>([])
  const [isLoading, setIsLoading] = useState<any>(true)
  const [page, setPage] = useState<any>(1)
  const [limit, setLimit] = useState<any>(10)
  const [sort, setSort] = useState<any>('novelties-first')
  const [value, setValue] = useState<string>('');
  const [showMore, setShowMore] = useState<boolean>(false);
  const [debouncedSearchValue] = useDebounce(value, 1000);

  const [totalCount, setTotalCount] = useState<any>(0)

  useEffect(() => {
    if (showMore && isOpenSearch) {
      setIsLoading(true)
      api.get(`/products/${sort}/${debouncedSearchValue}/${limit}/${page}/`)
        .then((response) => {
          setData([...data, ...response?.data?.data])
          setTotalCount(response?.data?.['total-count'])
        })
        .catch(() => {

        })
        .finally(() => {
          setIsLoading(false)
          setShowMore(false)
        });
    }
  }, [showMore])

  useEffect(() => {
    if (!showMore && isOpenSearch) {
      setIsLoading(true)
      api.get(`/products/${sort}/${debouncedSearchValue}/${limit}/${page}/`)
        .then((response) => {
          setData(response?.data?.data)
          setTotalCount(response?.data?.['total-count'])
        })
        .catch(() => {

        })
        .finally(() => {
          setIsLoading(false)
        });
    }
  }, [limit, sort, debouncedSearchValue, page])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        if (value === '') onChangeIsOpenSearch(false)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, value]);

  useEffect(() => {
    if (value && isOpenSearch) {
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
  }, [value, isOpenSearch])

  return (
    <div className={`search-modal ${isOpenSearch ? 'search-modal-active' : ''}`}>

      <div ref={ref} className="search-modal-wrap-search">
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
            {totalCount} результатов по запросу: {value}
          </h2>
          <Spin spinning={isLoading}>
            <div className="search-modal-result-items">
              {
                data?.map((item: any) =>
                  <Card item={item} />
                )
              }
            </div>
          </Spin>
          <div className="search-modal-result-buttons">
            {
              !(data?.length >= totalCount || data.length === 0 || page * limit >= totalCount) &&
              <CustomButton
                  onClick={() => {
                    setShowMore(true)
                    setPage(page + 1)
                  }}
                  title={'Загрузить еще'}
                  padding={'24px 0'}
                  maxWidth={"300px"}
                  backColor={'rgba(255, 255, 255, 1)'}
                  color={'rgba(34, 34, 34, 1)'}
                  border={"2px solid rgba(34, 34, 34, 1)"}
              />
            }
            {
              data.length !== 0 &&
              <CustomPagination
                  page={page}
                  limit={limit}
                  total={totalCount}
                  changePage={(e: any) => setPage(e)}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
