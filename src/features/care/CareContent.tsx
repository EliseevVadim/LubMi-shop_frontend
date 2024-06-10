import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import LineBlock from "../../components/client/common/LineBlock";
import Image from "next/dist/client/legacy/image";
import care from '../../../public/care.png'

const CareContent = () => {

  return (
    <div className="care">
      <MaxWithLayout>
        <LineBlock />
        <h1>
          Уход за изделиями
        </h1>
      </MaxWithLayout>

      <MaxWithLayout padding={0}>
        <div className="care-inside p-h20">
          <div className="care-inside-text p-h20-media">
            <div className="care-inside-text-block">
              <h2>
                Стирка
              </h2>
              <ul>
                <li>
                  Только в деликатном режиме, температура нагретой воды не должна превышать 30°.
                </li>
                <li>
                  Не забудьте добавить кондиционер, благодаря ему ткань будет сохранять свою мягкость и упругость, а
                  также шелк не потеряет свой цвет или принт. Плюсом кондиционера станет и снижение уровня накопления
                  электрического заряда ткани.
                </li>
                <li>
                  Не используйте агрессивные моющие средства. Изучите составы, чтобы в них не было отбеливателя.
                </li>
                <li>
                  Исключите отжим, для удаления влаги из ткани.
                </li>
                <li>
                  Остатки влаги можно убрать махровым полотенцем.
                </li>
                <li>
                  Можете повесить ткань на сушилку и просто дать испариться воде.
                </li>
                <li>
                  Прополощите ткань в холодной воде.
                </li>
                <li>
                  Ни в коем случае не трите пятна порошком или пятновыводителем.
                </li>
              </ul>
            </div>
            <div className="care-inside-text-block">
              <h2>
                Глажка
              </h2>
              <ul>
                <li>
                  настройте температуру утюга не выше 150С;
                </li>
                <li>
                  начните глажку с небольшого и незаметного элемента вашей вещи, чтоб проверить реакции;
                </li>
                <li>
                  лучше приступать к глажке, когда изделие не полностью высохло, и гладить через другую, более плотную
                  ткань;
                </li>
                <li>
                  гладьте только изнаночную сторону, можете гладить на лицевой только некоторые элементы и через плотную
                  ткань;
                </li>
                <li>
                  работайте руками быстро, не задерживайтесь с утюгом на месте;
                </li>
                <li>
                  не используйте парогенератор.
                </li>
              </ul>
            </div>
          </div>

          <div className="care-inside-img ">
            <Image
              src={care}
              layout={'fill'}
              objectFit={'cover'}
            />
          </div>
        </div>
      </MaxWithLayout>

    </div>
  );
};

export default CareContent;
