import React, { useState } from 'react';
import CounterMinusIcon from "../../assets/icons/CounterMinusIcon";
import CounterPlusIcon from "../../assets/icons/CounterPlusIcon";

const Counter = () => {

  const [value, setValue] = useState<number>(1)

  return (
    <div className="counter">
      <div className="counter-icon" onClick={() => setValue(value - 1)}>
        <CounterMinusIcon />
      </div>
      <div className="counter-input">
        {value}
        {/*<input*/}
        {/*  type="number"*/}
        {/*  disabled={true}*/}
        {/*  value={value}*/}
        {/*  onChange={(e) => setValue(e?.target?.value)}*/}
        {/*/>*/}
      </div>
      <div className="counter-icon" onClick={() => setValue(value + 1)}>
        <CounterPlusIcon />
      </div>
    </div>
  );
};

export default Counter;
