import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from "../../assets/icons/SearchIcon";
import ArrowToBottom from "../../assets/icons/ArrowToBottom";

const SortBloc = () => {

  const ref = useRef<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>('Порядок: по умолчанию')

  const items = [
    'Порядок: по умолчанию',
    'Цена: по возрастанию',
    'Цена: по убыванию',
    'Название: А - Я',
    'Название: Я - А'
  ]

  const handleSelect = (item: any) =>{
    setIsOpen(false)
    setSelectedItem(item)
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
          {selectedItem}
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
                {item}
              </li>
            )
          }
        </ul>
      }
    </div>
  );
};

export default SortBloc;
