import React from 'react';
import MaxWithLayout from "../../layouts/MaxWithLayout";
import LineBlock from "../../components/client/common/LineBlock";
import Spoller from "../../components/client/common/Spoller";

const DeliveryContent = () => {

  const mobData = [
    {
      title: 'ДОСТАВКА',
      desc: ' <p>\n' +
        '          Уважаемые покупатели, получить свой заказ вы можете транспортной компанией СДЭК или Почта России по всей\n' +
        '          России, а так же DHL в любую точку мира. Доставка по России Срок формирования и отправки заказа 2–4 рабочих\n' +
        '          дня после оплаты. Стоимость и сроки доставки рассчитываются индивидуально для каждого города, с тарифами и\n' +
        '          сроками доставки можно ознакомиться на сайте при оформлении заказа.\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Доставка внутри страны осуществляется: <br />\n' +
        '          Транспортной компанией СДЕК (до двери или до пункта самовывоза) во все города России от 2 до 10 рабочих дней.\n' +
        '          Доставка Почтой России до любого удобного вам отделения.\n' +
        '        </p>'
    },
    {
      title: 'ОПЛАТА',
      desc: '<p>\n' +
        '          Покупки можно оплатить с помощью безналичного расчёта при оформлении заказа. К оплате принимаются карты\n' +
        '          платёжных систем Visa, Mastercard и Мир. Чтобы оплатить заказ онлайн, выберите соответствующий пункт. Вам\n' +
        '          будет предложено проверить введённые вами личные данные, адрес доставки и выбранные товары, а затем\n' +
        '          подтвердить их, нажав кнопку «Оформить заказ». Откроется страница, на которой необходимо будет ввести данные\n' +
        '          карты, проверить их и нажать кнопку «Оплатить».\n' +
        '        </p>'
    },
    {
      title: 'ВОЗВРАТ',
      desc: ' <p>\n' +
        '            Покупатели, обратите внимание!\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            Возврат осуществляется при наличии заполненного заявления (<a href="">скачать «Заявление»</a>)\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            Обмену и возврату подлежат изделия, если их товарный вид не нарушен, нет следов носки, и загрязнений, а также\n' +
        '            сохранены товарные этикетки.\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            Возврат осуществляется за счет Покупателя.\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            В каждый заказ необходимо вложить бланк с заявлением на возврат.\n' +
        '          </p>'
    },
    {
      title: 'ВОЗВРАТ ИНТЕРНЕТ-ЗАКАЗА В онлайн-БУТИК LUBMI',
      desc: ' <p>\n' +
        '            У Покупателя есть 7 дней после получения интернет-заказа для возврата товара в онлайн-магазин. В соответствии\n' +
        '            Постановлении Правительства РФ от 31 декабря 2020 г. N 2463 п.22 «Об утверждении Правил продажи товаров по\n' +
        '            договору розничной купли-продажи, перечня товаров длительного пользования, на которые не распространяется\n' +
        '            требование потребителя о безвозмездном предоставлении ему товара, обладающего этими же основными\n' +
        '            потребительскими свойствами, на период ремонта или замены такого товара, и перечня непродовольственных товаров\n' +
        '            надлежащего качества, не подлежащих обмену, а также о внесении изменений в некоторые акты Правительства\n' +
        '            Российской Федерации.\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            Для возврата необходимо вещи упаковать в пакет и коробку, и приложить заявление на возврат.\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            Возврат денежных средств при безналичном расчёте осуществляется непосредственно на счёт, с которого\n' +
        '            происходила оплата.\n' +
        '          </p>\n' +
        '          <p>\n' +
        '            После одобрения возврата, покупателю будут перечислены денежные средства на карту или банковский счёт в\n' +
        '            течении 10ти банковских дней, для этого необходимо заполнить полные реквизиты для перевода денежных средств в\n' +
        '            заявлении на возврат. В случае проблем с прохождением платежа с покупателем связывается сотрудник\n' +
        '            онлайн-бутика для уточнения реквизитов. Обращаем внимание покупателей, возврат денежных средств зависит от\n' +
        '            скорости обработки операции вашим банком и может достигать 30 банковских дней.\n' +
        '          </p>'
    },
    {
      title: 'ОТПРАВКА ВОЗВРАТА',
      desc: '<p>\n' +
        '          Осуществить возврат можно в течении 7 дней после получения товара.\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Возврат товара надлежащего качества возможен лишь в том случае, если сохранены его товарный вид, этикетки,\n' +
        '          ярлыки, и потребительские свойства. К товару на возврат приложите заявление на возврат. Упакуйте все вещи для\n' +
        '          возврата в пакет и коробку, в которой был получен данный заказ. Отправьте на номер (добавить номер телефона!)\n' +
        '          следующую информацию: фотографию заполненного заявления и трек номер отправления. Отправьте посылку курьерской\n' +
        '          компанией СДЭК или Почтой России.\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Отправка через ПВЗ СДЭК\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Краснодар, ул. Коммунаров 211 (ТК Центр города) <br />\n' +
        '          Отправлять на имя Мишанковой Любови Алексеевны\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Контактный телефон (+7 номер телефона!)\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Отправка Почтой России\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Краснодарский край, Краснодар,350042 Выставочная ул. 6\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          На имя Мишанковой Л.А. (+7 номер телефона!)\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          После получения и проверки возврата, покупателю будут перечислены денежные средства на карту или банковский\n' +
        '          счёт в срок до 10ти рабочих дней, для этого необходимо заполнить полные реквизиты для перевода денежных\n' +
        '          средств в заявлении на возврат. В случае проблем с прохождением платежа с вами свяжется сотрудник\n' +
        '          онлайн-бутика для уточнения реквизитов. <br/>\n' +
        '          Обращаем ваше внимание, что возврат денежных средств зависит от скорости обработки операции вашим банком и\n' +
        '          может достигать 30 банковских дней.\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          Возврат денежных средств осуществляется за вычетом суммы доставки.\n' +
        '        </p>\n' +
        '        <p>\n' +
        '          В случае нарушений вышеуказанных условий оформления возврата или обмена товара (отсутствие заполненного\n' +
        '          заявления; заявление заполнено не полностью или с ошибками; отсутствуют необходимые документы) магазин не даёт\n' +
        '          гарантий на поступление товара на условиях возврата или обмена в магазин. В связи с этим магазин не\n' +
        '          гарантирует оплату данного товара.\n' +
        '        </p>'
    }
  ]

  return (
    <MaxWithLayout>
      <div className="delivery">
        <LineBlock />
        <h1>
          Доставка и оплата
        </h1>

        <div className="delivery-mob">
          {
            mobData?.map((item: any) =>
              <Spoller
                isWithBorder={false}
                title={item?.title}
                desc={item?.desc}
              />
            )
          }
        </div>

        <div className="delivery-desc">
          <h2>
            ДОСТАВКА
          </h2>
          <p>
            Уважаемые покупатели, получить свой заказ вы можете транспортной компанией СДЭК или Почта России по всей
            России, а так же DHL в любую точку мира. Доставка по России Срок формирования и отправки заказа 2–4 рабочих
            дня после оплаты. Стоимость и сроки доставки рассчитываются индивидуально для каждого города, с тарифами и
            сроками доставки можно ознакомиться на сайте при оформлении заказа.
          </p>
          <p>
            Доставка внутри страны осуществляется: <br />
            Транспортной компанией СДЕК (до двери или до пункта самовывоза) во все города России от 2 до 10 рабочих дней.
            Доставка Почтой России до любого удобного вам отделения.
          </p>
          <h2>
            ОПЛАТА
          </h2>
          <p>
            Покупки можно оплатить с помощью безналичного расчёта при оформлении заказа. К оплате принимаются карты
            платёжных систем Visa, Mastercard и Мир. Чтобы оплатить заказ онлайн, выберите соответствующий пункт. Вам
            будет предложено проверить введённые вами личные данные, адрес доставки и выбранные товары, а затем
            подтвердить их, нажав кнопку «Оформить заказ». Откроется страница, на которой необходимо будет ввести данные
            карты, проверить их и нажать кнопку «Оплатить».
          </p>
          <h2>
            ВОЗВРАТ
          </h2>
          <p>
            Покупатели, обратите внимание!
          </p>
          <p>
            Возврат осуществляется при наличии заполненного заявления (<a href="">скачать «Заявление»</a>)
          </p>
          <p>
            Обмену и возврату подлежат изделия, если их товарный вид не нарушен, нет следов носки, и загрязнений, а также
            сохранены товарные этикетки.
          </p>
          <p>
            Возврат осуществляется за счет Покупателя.
          </p>
          <p>
            В каждый заказ необходимо вложить бланк с заявлением на возврат.
          </p>
          <h2>
            ВОЗВРАТ ИНТЕРНЕТ-ЗАКАЗА В онлайн-БУТИК LUBMI
          </h2>
          <p>
            У Покупателя есть 7 дней после получения интернет-заказа для возврата товара в онлайн-магазин. В соответствии
            Постановлении Правительства РФ от 31 декабря 2020 г. N 2463 п.22 «Об утверждении Правил продажи товаров по
            договору розничной купли-продажи, перечня товаров длительного пользования, на которые не распространяется
            требование потребителя о безвозмездном предоставлении ему товара, обладающего этими же основными
            потребительскими свойствами, на период ремонта или замены такого товара, и перечня непродовольственных товаров
            надлежащего качества, не подлежащих обмену, а также о внесении изменений в некоторые акты Правительства
            Российской Федерации.
          </p>
          <p>
            Для возврата необходимо вещи упаковать в пакет и коробку, и приложить заявление на возврат.
          </p>
          <p>
            Возврат денежных средств при безналичном расчёте осуществляется непосредственно на счёт, с которого
            происходила оплата.
          </p>
          <p>
            После одобрения возврата, покупателю будут перечислены денежные средства на карту или банковский счёт в
            течении 10ти банковских дней, для этого необходимо заполнить полные реквизиты для перевода денежных средств в
            заявлении на возврат. В случае проблем с прохождением платежа с покупателем связывается сотрудник
            онлайн-бутика для уточнения реквизитов. Обращаем внимание покупателей, возврат денежных средств зависит от
            скорости обработки операции вашим банком и может достигать 30 банковских дней.
          </p>
          <h2>
            ОТПРАВКА ВОЗВРАТА
          </h2>
          <p>
            Осуществить возврат можно в течении 7 дней после получения товара.
          </p>
          <p>
            Возврат товара надлежащего качества возможен лишь в том случае, если сохранены его товарный вид, этикетки,
            ярлыки, и потребительские свойства. К товару на возврат приложите заявление на возврат. Упакуйте все вещи для
            возврата в пакет и коробку, в которой был получен данный заказ. Отправьте на номер (добавить номер телефона!)
            следующую информацию: фотографию заполненного заявления и трек номер отправления. Отправьте посылку курьерской
            компанией СДЭК или Почтой России.
          </p>
          <p>
            Отправка через ПВЗ СДЭК
          </p>
          <p>
            Краснодар, ул. Коммунаров 211 (ТК Центр города) <br />
            Отправлять на имя Мишанковой Любови Алексеевны
          </p>
          <p>
            Контактный телефон (+7 номер телефона!)
          </p>
          <p>
            Отправка Почтой России
          </p>
          <p>
            Краснодарский край, Краснодар,350042 Выставочная ул. 6
          </p>
          <p>
            На имя Мишанковой Л.А. (+7 номер телефона!)
          </p>
          <p>
            После получения и проверки возврата, покупателю будут перечислены денежные средства на карту или банковский
            счёт в срок до 10ти рабочих дней, для этого необходимо заполнить полные реквизиты для перевода денежных
            средств в заявлении на возврат. В случае проблем с прохождением платежа с вами свяжется сотрудник
            онлайн-бутика для уточнения реквизитов. <br/>
            Обращаем ваше внимание, что возврат денежных средств зависит от скорости обработки операции вашим банком и
            может достигать 30 банковских дней.
          </p>
          <p>
            Возврат денежных средств осуществляется за вычетом суммы доставки.
          </p>
          <p>
            В случае нарушений вышеуказанных условий оформления возврата или обмена товара (отсутствие заполненного
            заявления; заявление заполнено не полностью или с ошибками; отсутствуют необходимые документы) магазин не даёт
            гарантий на поступление товара на условиях возврата или обмена в магазин. В связи с этим магазин не
            гарантирует оплату данного товара.
          </p>
        </div>

      </div>
    </MaxWithLayout>
  );
};

export default DeliveryContent;
