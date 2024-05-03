import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from "../../../assets/icons/SearchIcon";
import ArrowToBottom from "../../../assets/icons/ArrowToBottom";

const SelectorBlock = () => {

  const ref = useRef<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<string>('М')

  const items = [
    'М',
    'S',
    'L',
    'XS',
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
    <div className="selector-wrap" ref={ref}>
      <div className="selector" onClick={() => setIsOpen(!isOpen)}>
        <p className="selector-value">
          {selectedItem}
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
                {item}
              </li>
            )
          }
        </ul>
      }
    </div>
  );
};

export default SelectorBlock;
