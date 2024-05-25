import React from 'react';
import Image from "next/dist/client/legacy/image";
import perfumeryPerfumeryOne from "../../../../public/perfumery-perfumery-one.png";
import perfumeryPerfumeryTwo from "../../../../public/perfumery-perfumery-two.png";
import perfumeryPerfumeryThree from "../../../../public/perfumery-perfumery-three.png";
import MaxWithLayout from "../../../layouts/MaxWithLayout";

const PerfumeryPerfumery = () => {

  return (
    <div className="perfumery-perfumery">
      <MaxWithLayout padding={'0 20px'}>
        <div className="perfumery-perfumery-line">
          <div className="perfumery-perfumery-line-extra" />
        </div>
        <h2>
          Парфюмерия
        </h2>
        <div className="perfumery-perfumery-mob">
          <p>
            Любимые духи — пленительный аромат, изящный флакон, и коробочка с логотипом любимого бренда — объект,
            пропитанный образами и эмоциями. Чем больше мы знаем об истории духов, о фирме, под чьим именем они
            выпущены, о личности заказчика или создателя, - тем богаче для нас звучит мелодия аромата.
          </p>
          <p>
            Когда мы душимся, ароматы проникают в нас и постепенно становятся частью нас самих.
            Если вы любите ароматы и духи для вас не просто парфюмерная композиция, а нечто большее — настроение,
            воспоминания, эмоции и чувства — то мой парфюмерный магазинчик точно для вас.
          </p>
        </div>
      </MaxWithLayout>

      <div className="perfumery-perfumery-inside p-h20">
        <div className="perfumery-perfumery-inside-left">
          <p>
            Любимые духи — пленительный аромат, изящный флакон, и коробочка с логотипом любимого бренда — объект,
            пропитанный образами и эмоциями. Чем больше мы знаем об истории духов, о фирме, под чьим именем они
            выпущены, о личности заказчика или создателя, - тем богаче для нас звучит мелодия аромата.
          </p>
          <p>
            Когда мы душимся, ароматы проникают в нас и постепенно становятся частью нас самих.
            Если вы любите ароматы и духи для вас не просто парфюмерная композиция, а нечто большее — настроение,
            воспоминания, эмоции и чувства — то мой парфюмерный магазинчик точно для вас.
          </p>
          <div className="perfumery-perfumery-inside-left-img">
            <Image
              src={perfumeryPerfumeryOne}
              layout={'fill'}
              objectFit={'cover'}
            />
          </div>
        </div>
        <div className="perfumery-perfumery-inside-right">
          <div className="perfumery-perfumery-inside-right-img-one">
            <Image
              src={perfumeryPerfumeryTwo}
              layout={'fill'}
              objectFit={'cover'}
            />
          </div>
          <div className="perfumery-perfumery-inside-right-img-two">
            <Image
              src={perfumeryPerfumeryThree}
              layout={'fill'}
              objectFit={'cover'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeryPerfumery;
