import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import LineBlock from "../../components/client/common/LineBlock";
import CustomButton from "../../components/client/common/CustomButton";
import TelegramIcon from "../../assets/icons/TelegramIcon";

const ContactContent = () => {

  const handleClickButton = () =>{
    const link = document.createElement('a');
    link.href = 'https://t.me/lubmi_ru';
    link.target = '_blank';
    link.click();
  }


  return (
    <MaxWithLayout>
      <div className="contact">
        <LineBlock />
        <h1>
          Контакты
        </h1>

        <div className="contact-inside">
          <div className="contact-inside-phone">
            Телефон клиентской поддержки:
            <a href="tel:+7 918 008 2891"> +7 918 008 2891</a>
          </div>
          <div className="contact-inside-phone">
            ИП МИШАНКОВА ЛЮБОВЬ АЛЕКСЕЕВНА<br/>
            Юридический адрес: г. Краснодар, ул.Колхозная 5<br/>
            ИНН 231015150686<br/>
            ОГРНИП 323237500525672<br/>
          </div>
          <div className="contact-inside-schedule">
            пн-пт с 11:00 до 21:00
          </div>
          <div className="contact-inside-about">
            Также, вы можете связаться с нами <br/>
            другим способом:
          </div>
          <div className="contact-inside-button">
            <CustomButton
              onClick={handleClickButton}
              title={'Написать в Telegram'}
              padding={'24px 0'}
              maxWidth={'400px'}
              backColor={'rgba(34, 34, 34, 1)'}
              color={'rgba(255, 255, 255, 1)'}
              icon={<TelegramIcon/>}
            />
          </div>
        </div>

      </div>
    </MaxWithLayout>
  );
};

export default ContactContent;
