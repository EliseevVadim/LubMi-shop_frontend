import React, { useState } from 'react';
import PerfumerArrowToBottom from "../../../assets/icons/PerfumerArrowToBottom";

const Spoller = ({
                   title,
                   desc,
                   isWithBorder = true
                 }) => {

  const [isActive, setIsActive] = useState<boolean>(false)

  return (
    <div
      className="spoller"
      style={{
        borderBottom: isWithBorder ? '1px solid rgba(34, 34, 34, 1)' : 'none',
        paddingBottom: isWithBorder ? 20 : 0,
      }}
    >
      <div className="spoller-main" onClick={() => setIsActive(!isActive)}>
        <h3>
          {title}
        </h3>
        <div className={`spoller-main-arrow ${isActive && 'arrow-active'}`}>
          <PerfumerArrowToBottom />
        </div>
      </div>
      <div className={`spoller-sub ${isActive && 'sub-active'}`}
           dangerouslySetInnerHTML={{ __html: desc || '' }}
      />
    </div>
  );
};

export default Spoller;
