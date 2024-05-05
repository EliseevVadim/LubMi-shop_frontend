import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import SearchIcon from "../../../assets/icons/SearchIcon";
import ArrowToBottom from "../../../assets/icons/ArrowToBottom";

const SelectorBlock: FC<PropsWithChildren<{
  items: any,
  selectedItem: any,
  setSelectedItem: any,
}>> = ({
         items,
         selectedItem,
         setSelectedItem
       }) => {

  const ref = useRef<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelect = (item: any) => {
    setIsOpen(false)
    setSelectedItem(item)
  }

  useEffect(() => {
    setSelectedItem(items[0])
  }, [items])

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
    <div className="selector-wrap" ref={ref}>
      <div className="selector" onClick={() => setIsOpen(!isOpen)}>
        <p className="selector-value">
          {selectedItem?.size}
        </p>
        <div className={`selector-arrow ${isOpen && 'selector-arrow-open'}`}>
          <ArrowToBottom />
        </div>
      </div>
      {
        isOpen &&
        <ul className="selector-menu">
          {
            items.map((item: any) =>
              <li onClick={() => handleSelect(item)}>
                {item?.size}
              </li>
            )
          }
        </ul>
      }
    </div>
  );
};

export default SelectorBlock;
