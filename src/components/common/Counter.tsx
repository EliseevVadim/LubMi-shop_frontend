import React, { useState } from 'react';
import CounterMinusIcon from "../../assets/icons/CounterMinusIcon";
import CounterPlusIcon from "../../assets/icons/CounterPlusIcon";

const Counter = () => {
  const [value, setValue] = useState<number>(1);

  const decrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const increment = () => {
    if (value < 100) {
      setValue(value + 1);
    }
  };

  return (
    <div className="counter">
      <div className="counter-icon" onClick={decrement}>
        <CounterMinusIcon />
      </div>
      <div className="counter-input">
        {value}
      </div>
      <div className="counter-icon" onClick={increment}>
        <CounterPlusIcon />
      </div>
    </div>
  );
};

export default Counter;
