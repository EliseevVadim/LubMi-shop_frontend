import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import CustomButton from "../../../components/client/common/CustomButton";

const PerfumeryIntro = () => {


  const handleClickButton = () =>{
    const link = document.createElement('a');
    link.href = 'https://t.me/lubmi_ru';
    link.target = '_blank';
    link.click();
  }


  return (
    <div className="perfumery-intro">
      <MaxWithLayout>
        <div className="perfumery-intro-inside">
          <h1>
            Парфюмерия
          </h1>
          <CustomButton
            onClick={handleClickButton}
            title={'Заказать аромат'}
            padding={'24px 0'}
            maxWidth={327}
            backColor={'rgba(255, 255, 255, 1)'}
            color={'rgba(34, 34, 34, 1)'}
          />
        </div>
      </MaxWithLayout>
      <div className="perfumery-intro-gradient"/>

    </div>
  );
};

export default PerfumeryIntro;
