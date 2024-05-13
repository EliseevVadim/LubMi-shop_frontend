import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import SearchIcon from "../../../assets/icons/SearchIcon";
import ArrowToBottom from "../../../assets/icons/ArrowToBottom";
import { useRouter } from "next/router";

interface SortTimes {
  id: number,
  type: string,
  title: string
}

const items: SortTimes[] = [
  {
    id: 1,
    type: 'novelties-first',
    title: 'Порядок: по умолчанию'
  },
  {
    id: 2,
    type: 'price-asc',
    title: 'Цена: по возрастанию'
  },
  {
    id: 3,
    type: 'price-dsc',
    title: 'Цена: по убыванию'
  },
  {
    id: 4,
    type: 'title-asc',
    title: 'Название: А - Я'
  },
  {
    id: 5,
    type: 'title-dsc',
    title: 'Название: Я - А'
  },
]

const SortBloc: FC<PropsWithChildren<{ replaceUrl?: boolean, setCurrentSort?: any | undefined }>> = ({ replaceUrl = false, setCurrentSort }) => {

  const ref = useRef<any>(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<SortTimes>(items[0])

  const handleSelect = (item: any) => {
    setIsOpen(false)
    setSelectedItem(item)

    if (replaceUrl) {
      const { pathname, query } = router;
      const newQuery = { ...query, sort: item?.type };
      const href = {
        pathname,
        query: newQuery,
      };
      router.push(href);
    } else {
      setCurrentSort(item?.type)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref?.current?.contains(event.target)) {
        setIsOpen(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="sort-wrap" ref={ref}>
      <div className="sort" onClick={() => setIsOpen(!isOpen)}>
        <SearchIcon />
        <p className="sort-value">
          {selectedItem?.title}
        </p>
        <div className={`sort-arrow ${isOpen && 'sort-arrow-open'}`}>
          <ArrowToBottom />
        </div>
      </div>

      {
        isOpen &&
        <ul className="sort-menu">
          {
            items.map((item: any) =>
              <li onClick={() => handleSelect(item)}>
                {item?.title}
              </li>
            )
          }
        </ul>
      }
    </div>
  );
};

export default SortBloc;
