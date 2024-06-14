import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import CustomButton from "../../../components/client/common/CustomButton";

const PerfumeryOrder = () => {


  const handleClickButton = () =>{
    const link = document.createElement('a');
    link.href = 'https://t.me/lubmi_ru';
    link.target = '_blank';
    link.click();
  }

  return (
    <div className="perfumery-order">

      <MaxWithLayout>
        <div className="perfumery-order-inside">
          <h2 >
            КАК ЗАКАЗАТЬ ПАРФЮМ
          </h2>
          <div className="perfumery-order-inside-main">
            <p>
              Актуальный каталог и прайс постоянно обновляется, поэтому для уточнения по наличию и
              стоимости парфюма, который вас интересует, жмите: <span>«ЗАКАЗАТЬ АРОМАТ».</span>
            </p>
            <p>
              Вас перенаправит в мессенджер для дальнейшей информации. Для начала диалога в мессенджере пишите: «Хочу
              аромат»
            </p>
            <div className="perfumery-order-inside-main-button">
              <CustomButton
                onClick={handleClickButton}
                title={'Заказать аромат'}
                padding={'24px 0'}
                maxWidth={'100%'}
                backColor={'rgba(255, 255, 255, 1)'}
                color={'rgba(34, 34, 34, 1)'}
              />
            </div>
          </div>
        </div>
      </MaxWithLayout>

      <div className="perfumery-order-gradient"/>
    </div>
  );
};

export default PerfumeryOrder;
