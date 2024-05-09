import React, { useEffect, useState } from 'react';
import { useUnit } from "effector-react";
import { $isOpenBucket, $isOpenCheckout, $productModal, onChangeIsOpenCheckout, setProductModal } from "../model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import ProductArrowToLeft from "../../../assets/icons/ProductArrowToLeft";
import CrossIcon from "../../../assets/icons/CrossIcon";
import BucketCard from "../../../components/client/bucket/BucketCard";
import { Checkbox, Form, Input, Radio, Select, Space } from "antd";
import InputMask from "react-input-mask";
import CustomButton from "../../../components/client/common/CustomButton";
import LineBlock from "../../../components/client/common/LineBlock";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import {
  $bucket,
  $cities,
  $selectedCities,
  BucketCheckoutFx,
  CityFX,
  onSelectCity
} from "../../client/bucket/model/index";
import {useDebounce} from "use-debounce";

const CheckoutModal = () => {

  const [
    isOpenCheckout,
    selectedCities,
    cities,
    bucket
  ] = useUnit([
    $isOpenCheckout,
    $selectedCities,
    $cities,
    $bucket
  ])
  const [radio, setRadio] = useState('cd');
  const [searchCity, setSearchCity] = useState<any>('');
  const [debouncedSearchCity] = useDebounce(searchCity, 1000);

  useEffect(() =>{
    CityFX(debouncedSearchCity)
  },[debouncedSearchCity])

  const onFinish = (values: any) =>{
    console.log(values)

    const data = {
      cu_first_name: values?.name,
      cu_last_name:  values?.surname,
      cu_phone: values?.phone,
      cu_city_uuid: selectedCities?.city,
      cu_street: values?.street,
      cu_building: values?.building,
      cu_entrance: values?.entrance,
      cu_floor: values?.floor,
      cu_apartment: values?.apartment,
      cu_fullname: values?.fullName,
      cu_confirm: true
    }
    console.log(data)
    // BucketCheckoutFx(values)
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
                      maxLength={18}
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
                <Select
                  style={{
                    width: '100%'
                  }}
                  className={'test-test'}
                  placeholder={'Введите Ваш город'}
                  filterOption={false}
                  value={selectedCities}
                  onChange={(e, y) => onSelectCity({id: y?.key, city: y?.children})}
                  showSearch
                  onSearch={(e) => setSearchCity(e)}
                >
                  {cities?.map((option: any) => {
                    return (
                      <Select.Option key={option?.uuid?.toString()} value={option?.uuid?.toString()}>
                        {`${option?.city}, ${option?.region}`}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Radio.Group onChange={(e) => setRadio(e.target.value)} value={radio} defaultValue={'cd'}>
                <Space direction="vertical">
                  <Radio value={'cd'}>
                    <div className="checkout-modal-main-form-radio">
                      СДЭК, <span>от 3 дней, от 459 руб.</span>
                    </div>
                  </Radio>
                  <Radio value={'pr'}>
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
                  name="building"
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
                  name="apartment"
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
                  name="entrance"
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
                  name="floor"
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
              {
                bucket?.map((item: any) =>
                  <BucketCard isWithCounter={true} item={item}/>
                )
              }
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
