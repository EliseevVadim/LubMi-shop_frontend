import React from 'react';
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import perfumerBenefit from '../../../../public/perfumer-benefit.png'
import Image from "next/dist/client/legacy/image";

const PerfumerBenefit = () => {

  return (
    <div className="perfumery-benefit">
      <MaxWithLayout>
        <div className="perfumery-perfumery-line">
          <div className="perfumery-perfumery-line-extra" />
        </div>
      </MaxWithLayout>

      <MaxWithLayout padding={0}>
        <div className="perfumery-benefit-inside p-h20">
          <div className="perfumery-benefit-inside-text">
            <h2>
              твоя выгода!
            </h2>
            <p>
              Именно здесь вы можете заказать оригинальную люксовую и нишевую парфюмерию по очень привлекательной
              стоимости. Так как вы заказываете парфюм напрямую у оптового поставщика, минуя огромную наценку магазинов.
            </p>
            <p>
              Более того именно у нас вы можете заказать сеты с мини версиями ароматов, чтобы познакомиться и влюбиться
              в ароматы, которые не пробовали ранее.
            </p>
            <p>
              И ещё прекрасная новость для тех, кто хочет заниматься парфюмом! У вас есть уникальная возможность заказа
              парфюма по оптовой стоимости от трёх единиц полноразмерных флаконов.
            </p>
          </div>
          <div className="perfumery-benefit-inside-img">
            <Image
              src={perfumerBenefit}
              layout={'fill'}
              objectFit={'cover'}
            />
          </div>
        </div>
      </MaxWithLayout>

      <MaxWithLayout>
        <div className="perfumery-benefit-mob">
          <p>
            Именно здесь вы можете заказать оригинальную люксовую и нишевую парфюмерию по очень привлекательной
            стоимости. Так как вы заказываете парфюм напрямую у оптового поставщика, минуя огромную наценку магазинов.
          </p>
          <p>
            Более того именно у нас вы можете заказать сеты с мини версиями ароматов, чтобы познакомиться и влюбиться
            в ароматы, которые не пробовали ранее.
          </p>
          <p>
            И ещё прекрасная новость для тех, кто хочет заниматься парфюмом! У вас есть уникальная возможность заказа
            парфюма по оптовой стоимости от трёх единиц полноразмерных флаконов.
          </p>
        </div>
      </MaxWithLayout>
    </div>
  );
};

export default PerfumerBenefit;
