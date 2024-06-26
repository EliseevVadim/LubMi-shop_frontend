import React, { useState } from 'react';
import CounterMinusIcon from "../../../assets/icons/CounterMinusIcon";
import CounterPlusIcon from "../../../assets/icons/CounterPlusIcon";
import { changeCountEvent } from "../../../entety/client/bucket/model/index";
import { useAlert } from "../../../controllers/AlertNotification/index";

const Counter = ({ item, handleLessThanOne }: any) => {

  const maxCount = item?.sizes?.find((itemSize: any) => itemSize?.id === item?.size?.id)?.quantity
  const uAlert = useAlert()

  const decrement = () => {
    if (item?.quantity > 1) {
      changeCountEvent({ ...item, quantity: item?.quantity - 1 })
    } else {
      handleLessThanOne(true)
    }
  };

  const increment = () => {
    if (item?.quantity < Number(maxCount)) {
      changeCountEvent({ ...item, quantity: item?.quantity + 1 })
    } else {
      uAlert({
        message: `Извините, достигнут лимит. Это максимально возможное количество товаров в наличии`
      })
    }
  };

  return (
    <div className="counter">
      <div className="counter-icon" onClick={decrement}>
        <CounterMinusIcon />
      </div>
      <div className="counter-input">
        {item?.quantity}
      </div>
      <div className="counter-icon" onClick={increment}>
        <CounterPlusIcon />
      </div>
    </div>
  );
};

export default Counter;
