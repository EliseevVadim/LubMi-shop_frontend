import React from 'react';
import WhatsAppIcon from "../../../assets/icons/WhatsAppIcon";
import TelegramIcon from "../../../assets/icons/TelegramIcon";
import YouTubeIcon from "../../../assets/icons/YouTubeIcon";

const Social = () => {

  return (
    <div className='social'>
      <div className="social-left">
        <a href="">
          <WhatsAppIcon />
        </a>
        <a href="">
          <TelegramIcon/>
        </a>
      </div>
      <div className="social-right">
        <a href="">
          <YouTubeIcon/>
        </a>
      </div>
    </div>
  );
};

export default Social;
