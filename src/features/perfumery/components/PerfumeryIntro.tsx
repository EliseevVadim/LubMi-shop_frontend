import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import CustomButton from "../../../components/client/common/CustomButton";

const PerfumeryIntro = () => {
  return (
    <div className="perfumery-intro">
      <MaxWithLayout>
        <div className="perfumery-intro-inside">
          <h1>
            Парфюмерия
          </h1>
          <CustomButton
            title={'Заказать аромат'}
            padding={'24px 0'}
            maxWidth={327}
            backColor={'rgba(255, 255, 255, 1)'}
            color={'rgba(34, 34, 34, 1)'}
          />
        </div>
      </MaxWithLayout>
    </div>
  );
};

export default PerfumeryIntro;
