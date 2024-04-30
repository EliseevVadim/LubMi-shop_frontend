import React, { useState, useEffect, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import CrossIcon from "../../assets/icons/CrossIcon";

const Context = React.createContext();

const useAlert = () => {
  const {
    setList
  } = useContext(Context);

  return ({ message = '' }) => {
    const id = uuid();
    setList((prev) => [
      ...prev,
      {
        id,
        message
      }
    ])
  };
}

const AlertItem = ({ item, onDeletListItem }) => {
  const onDelete = () => {
    onDeletListItem(item.id);
  }
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      onDelete()
    }, 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);
  return (
    <div key={item.id} style={{ paddingTop: 10 }}>
      <div className="alert-notification-item">
        <p className="alert-notification-item-text">{item.message}</p>
        <div className="alert-notification-item-circle" onClick={onDelete}>
          <CrossIcon />
        </div>
      </div>
    </div>
  );
}

const AlertProvider = ({ children }) => {
  const [list, setList] = useState<any>([]);

  const onDeletListItem = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <Context.Provider value={{ setList }}>
      <div className="alert-notification">
        {list.map((item) => (
          <AlertItem key={item.id} item={item} onDeletListItem={onDeletListItem} />
        ))}
      </div>
      {children}
    </Context.Provider>
  );
}

export { AlertProvider, useAlert };
