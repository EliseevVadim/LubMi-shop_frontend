import React, { useEffect, useState } from 'react';
import { useUnit } from "effector-react";
import { $isOpenBucket, $isOpenCheckout, $productModal, onChangeIsOpenCheckout, setProductModal } from "../model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import ProductArrowToLeft from "../../../assets/icons/ProductArrowToLeft";
import CrossIcon from "../../../assets/icons/CrossIcon";
import BucketCard from "../../../components/client/bucket/BucketCard";
import { Checkbox, Form, Input, Radio, Space } from "antd";
import InputMask from "react-input-mask";
import CustomButton from "../../../components/client/common/CustomButton";
import LineBlock from "../../../components/client/common/LineBlock";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

const CheckoutModal = () => {

  const [isOpenBucket, isOpenCheckout] = useUnit([$isOpenBucket, $isOpenCheckout])

  const onFinish = (values: any) =>{
    console.log(values)
  }

  useEffect(() => {
    if (isOpenCheckout) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '4px';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0px';
    };
  }, [isOpenCheckout])
  const [value, setValue] = useState();

  return (
    <div className={`checkout-modal ${isOpenCheckout ? 'checkout-modal-open' : ''}`}>
      <MaxWithLayout>
        <div className="checkout-modal-top">
          <div className="checkout-modal-top-back" onClick={() => onChangeIsOpenCheckout(false)}>
            <ProductArrowToLeft />
            Назад
          </div>
          <div className="checkout-modal-top-close" onClick={() => onChangeIsOpenCheckout(false)}>
            <CrossIcon />
          </div>
        </div>
        <div className="checkout-modal-main">
          <div className="checkout-modal-main-form">
            <Form
              // form={form}
              layout={"vertical"}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Данные введены неверно",
                  },
                ]}
              >
                <Input
                  placeholder={'Введите имя'}
                  style={{
                    height: 38
                  }}
                />
              </Form.Item>
              <Form.Item
                name="surname"
                rules={[
                  {
                    required: true,
                    message: "Данные введены неверно",
                  },
                ]}
              >
                <Input
                  placeholder={'Введите фамилию'}
                  style={{
                    height: 38
                  }}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Данные введены неверно",
                  },
                ]}
              >
                <InputMask
                  mask="+7 (999) 999-99-99"
                  maskChar=""
                  placeholder='+7 (999) 999-99-99'
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderColor: "transparent",
                    height: 38,
                  }}
                >
                  {((inputProps: any) => {
                    return <Input
                      {...inputProps}
                      type="tel"
                      disableUnderline
                    />
                  }) as any}
                </InputMask>
              </Form.Item>

              <h3>
                Доставка
              </h3>

              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Данные введены неверно",
                  },
                ]}
              >
                {/*<Input*/}
                {/*  bordered={false}*/}
                {/*  placeholder={'Введите Ваш город'}*/}
                {/*  style={{*/}
                {/*    height: 38*/}
                {/*  }}*/}
                {/*/>*/}
                <AddressSuggestions
                  token="596489711c19cb126026c3017de07bcdd6d5367c"
                  containerClassName='dadata-input'
                  suggestionClassName={'datata-suggestion'}
                  highlightClassName={'datata-highlight'}
                  count={5}
                  selectOnBlur={true}
                  value={value}
                  onChange={setValue as any}
                  autoload={true}
                  delay={500}
                  inputProps={{
                    placeholder: 'Введите Ваш город'
                  }}
                />
              </Form.Item>

              <Radio.Group>
                <Space direction="vertical">
                  <Radio value={1}>
                    <div className="checkout-modal-main-form-radio">
                      СДЭК, <span>от 3 дней, от 459 руб.</span>
                    </div>
                  </Radio>
                  <Radio value={2}>
                    <div className="checkout-modal-main-form-radio">
                      Доставка почтой России, <span> от 3 дней, от 459 руб.</span>
                    </div>
                  </Radio>
                </Space>
              </Radio.Group>

              <h3>
                Получатель
              </h3>

              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Данные введены неверно",
                  },
                ]}
              >
                <Input
                  placeholder={'Введите Ваше ФИО полностью'}
                  style={{
                    height: 38
                  }}
                />
              </Form.Item>
              <Form.Item
                name="street"
                rules={[
                  {
                    required: true,
                    message: "Данные введены неверно",
                  },
                ]}
              >
                <Input
                  placeholder={'Улица'}
                  style={{
                    height: 38
                  }}
                />
              </Form.Item>

              <div className="checkout-modal-main-form-block">
                <Form.Item
                  name="home1"
                  rules={[
                    {
                      required: true,
                      message: "Данные введены неверно",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Дом'}
                    style={{
                      height: 38
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="home2"
                  rules={[
                    {
                      required: true,
                      message: "Данные введены неверно",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Квартира/офис'}
                    style={{
                      height: 38
                    }}
                  />
                </Form.Item>
              </div>

              <div className="checkout-modal-main-form-block">
                <Form.Item
                  name="home3"
                  rules={[
                    {
                      required: true,
                      message: "Данные введены неверно",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Подъезд'}
                    style={{
                      height: 38
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="home4"
                  rules={[
                    {
                      required: true,
                      message: "Данные введены неверно",
                    },
                  ]}
                >
                  <Input
                    placeholder={'Этаж'}
                    style={{
                      height: 38
                    }}
                  />
                </Form.Item>
              </div>

              <div className="checkout-modal-main-form-check-box">
                <Checkbox
                >
                  Я согласен/а с политикой конфиденциальности
                </Checkbox>
              </div>

              <div className="checkout-modal-main-sum">
                <h2>
                  Сумма к оплате: 35 700 руб
                </h2>
                <p>
                  Сумма: 35 700 руб
                </p>
                <p>
                  СДЭК: 700 руб
                </p>
                <p>
                  Росиия, г.Москва
                </p>
                <p>
                  Итоговая сумма: 35 700 руб
                </p>
              </div>

              <div className="checkout-modal-main-form-button">
                <CustomButton
                  title={'Оформить заказ'}
                  padding={'24px 0'}
                  maxWidth={'100%'}
                  backColor={'rgba(34, 34, 34, 1)'}
                  color={'rgba(255, 255, 255, 1)'}
                />
              </div>

            </Form>
          </div>

          <div className="checkout-modal-main-order">
            <div className="checkout-modal-main-order-mob">
              <h3>
                ваш заказ
              </h3>
              <LineBlock/>
            </div>
            <div className="checkout-modal-main-order-list">
              <BucketCard isWithCounter={true} />
              <BucketCard isWithCounter={true} />
              <BucketCard isWithCounter={true} />
            </div>
            <div className="checkout-modal-main-order-mob">
              <LineBlock/>
            </div>
            <div className="checkout-modal-main-order-sum">
              <h2>
                Сумма к оплате: 35 700 руб
              </h2>
              <p>
                Сумма: 35 700 руб
              </p>
              <p>
                Итоговая сумма: 35 700 руб
              </p>
            </div>
          </div>
        </div>
      </MaxWithLayout>
    </div>
  );
};

export default CheckoutModal;
