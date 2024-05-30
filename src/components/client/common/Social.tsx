import React from 'react';
import WhatsAppIcon from "../../../assets/icons/WhatsAppIcon";
import TelegramIcon from "../../../assets/icons/TelegramIcon";
import YouTubeIcon from "../../../assets/icons/YouTubeIcon";
import InstagramSocialIcon from "../../../assets/icons/InstagramSocialIcon";

const Social = () => {

  return (
    <div className='social'>
      <div className="social-left">
        <a href="https://wa.me/79180082891" target="_blank">
          <WhatsAppIcon />
        </a>
        <a href="https://t.me/lubmi_ru" target="_blank">
          <TelegramIcon/>
        </a>
      </div>
      <div className="social-right">
        <a href="https://www.instagram.com/lubov_mishankova" target="_blank">
          <InstagramSocialIcon/>
        </a>
      </div>
    </div>
  );
};

export default Social;
