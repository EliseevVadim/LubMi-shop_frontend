import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import CustomButton from "../../../components/client/common/CustomButton";

const PerfumeryOrder = () => {

  return (
    <div className="perfumery-order">

      <MaxWithLayout>
        <div className="perfumery-order-inside">
          <h2 >
            КАК ЗАКАЗАТЬ ПАРФЮМ
          </h2>
          <div className="perfumery-order-inside-main">
            <p>
              Актуальный каталог и прайс всегда обновляется, поэтому для уточнения по наличию и стоимости, жмите на
              кнопку <span>«ЗАКАЗАТЬ АРОМАТ».</span>
            </p>
            <p>
              Вас перенаправит в мессенджер для дальнейшей информации. Для начала диалога в мессенджере пишите: «Хочу
              аромат»
            </p>
            <div className="perfumery-order-inside-main-button">
              <CustomButton
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
