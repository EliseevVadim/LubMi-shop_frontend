import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import CustomButton from "../../../components/common/CustomButton";
import PerfumerDropDown from "./PerfumerDropDown";

const PerfumerInfo = () => {

  const infoList = [
    {
      title: 'Виды парфюмерии',
    },
    {
      title: 'Как воспринимаются ароматы. Ольфакторная пирамида. Почему некоторые ароматы мы не слышим. Аносмия.',
    },
    {
      title: 'От чего зависит раскрытие пирамиды нот.',
    },
    {
      title: 'Мифы о парфюме',
    },
    {
      title: 'Ошибки в использовании парфюма',
    },
    {
      title: 'Как правильно пользоваться парфюмом, для его максимального раскрытия',
    },
    {
      title: 'Парфюмерные термины',
    },
    {
      title: 'Обозначение символов в парфюмерии',
    },
    {
      title: '10 причин заказать парфюм на распив',
    },
    {
      title: 'Популярные ароматы.',
    },
  ]
  return (
    <MaxWithLayout>
      <div className="perfumery-info">
        <div className="perfumery-perfumery-line">
          <div className="perfumery-perfumery-line-extra" />
        </div>

        <div className="perfumery-info-inside">
          <h2>
            ВАЖНАЯ ИНФОРМАЦИЯ
          </h2>

          <div className="perfumery-info-inside-blocks">
            {
              infoList?.map((item: any) =>
                <PerfumerDropDown
                  title={item.title}
                />
              )
            }
          </div>

          <div className="perfumery-info-inside-button">
            <CustomButton
              title={'Заказать аромат'}
              padding={'24px 0'}
              maxWidth={327}
              backColor={'rgba(34, 34, 34, 1)'}
              color={'rgba(255, 255, 255, 1)'}
            />
          </div>
        </div>
      </div>
    </MaxWithLayout>
  );
};

export default PerfumerInfo;
