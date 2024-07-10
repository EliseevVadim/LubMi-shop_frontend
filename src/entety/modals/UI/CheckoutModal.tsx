import React, { useEffect, useState } from 'react';
import { useUnit } from "effector-react";
import {
  $isOpenBucket,
  $isOpenCheckout,
  $productModal,
  onChangeIsOpenCheckout,
  onSetNotification,
  setProductModal
} from "../model/index";
import MaxWithLayout from "../../../layouts/MaxWithLayout";
import ProductArrowToLeft from "../../../assets/icons/ProductArrowToLeft";
import CrossIcon from "../../../assets/icons/CrossIcon";
import BucketCard from "../../../components/client/bucket/BucketCard";
import { Checkbox, Form, Input, Radio, Select, Skeleton, Space } from "antd";
import InputMask from "react-input-mask";
import CustomButton from "../../../components/client/common/CustomButton";
import LineBlock from "../../../components/client/common/LineBlock";
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import {
  $activeOrderId,
  $bucket, $bucketCalculated, $building,
  $cities, $isRussianPostAvaible, $selectedBuilding,
  $selectedCities, $selectedDelivery, $selectedStreet, $streets,
  BucketCheckoutFx, BuildingFX, CalculateBucketFx, changeActiveOrder, CheckOrderPayedFx, CheckRussianPostFx,
  CityFX, isRussianPostAvaible, onSelectBuilding,
  onSelectCity, onSelectDelivery, onSelectStreet, resetBucket, StreetFX
} from "../../client/bucket/model/index";
import { useDebounce } from "use-debounce";

const CheckoutModal = () => {

  const [form] = Form.useForm<{}>();

  const [
    isOpenCheckout,
    selectedCities,
    cities,
    bucket,
    bucketCalculated,
    isLoadingCalculate,
    selectedDelivery,
    isLoadingCheckout,
    streets,
    selectedStreet,
    building,
    selectedBuilding,
    activeOrderId,
    isRussianPostAvaible
  ] = useUnit([
    $isOpenCheckout,
    $selectedCities,
    $cities,
    $bucket,
    $bucketCalculated,
    CalculateBucketFx.pending,
    $selectedDelivery,
    BucketCheckoutFx.pending,
    $streets,
    $selectedStreet,
    $building,
    $selectedBuilding,
    $activeOrderId,
    $isRussianPostAvaible
  ])

  const [searchCity, setSearchCity] = useState<any>('');
  const [searchStreet, setSearchStreet] = useState<any>('');
  const [searchBuilding, setSearchBuilding] = useState<any>('');
  const [isAgree, setIsAgree] = useState<any>(false);
  const [debouncedSearchCity] = useDebounce(searchCity, 500);
  const [debouncedSearchStreet] = useDebounce(searchStreet, 500);
  const [debouncedSearchBuilding] = useDebounce(searchBuilding, 500);

  useEffect(() => {
    CityFX(debouncedSearchCity)
  }, [debouncedSearchCity])

  useEffect(() => {
    if (selectedCities?.id) {
      StreetFX(debouncedSearchStreet)
    }
  }, [selectedCities, debouncedSearchStreet])

  useEffect(() => {
    if (selectedCities?.id && selectedStreet) {
      BuildingFX(debouncedSearchBuilding)
    }
  }, [selectedStreet, debouncedSearchBuilding])

  useEffect(() => {
    if (selectedCities?.city && selectedStreet && selectedBuilding) {
      CheckRussianPostFx()
    }
  }, [selectedCities, selectedStreet, selectedBuilding])


  console.log(selectedCities?.city)
  console.log(selectedStreet)
  console.log(selectedBuilding)
  console.log('isRussianPostAvaible')
  console.log(isRussianPostAvaible)

  const onFinish = (values: any) => {

    const data = {
      delivery: selectedDelivery,
      cu_first_name: values?.name,
      cu_last_name: values?.surname,
      cu_phone: values?.phone,
      cu_city_uuid: selectedCities?.id,
      cu_city: selectedCities?.city,
      cu_street: selectedStreet,
      cu_building: selectedBuilding,
      cu_entrance: values?.entrance,
      cu_floor: values?.floor,
      cu_apartment: values?.apartment,
      cu_fullname: values?.fullName,
      cu_confirm: true,
      scart: bucket?.map((item: any) => ({ ppk: item.article, size_id: item?.size?.id, quantity: item?.quantity }))
    }

    BucketCheckoutFx(data)
      .then((res) => {
        console.log(res)
        if (res?.success) {
          if (res?.redirect){
            changeActiveOrder(res?.payment_id)
            // window?.open(res.redirect)

            const link = document.createElement('a');
            link.href = res.redirect;
            link.click();
          }
        } else {
          onSetNotification({
            title: 'Произошла ошибка',
            message: res?.why
          })
        }
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const isDisablePay = !selectedCities || !isAgree || !selectedDelivery

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

  useEffect(() => {
    const interval = setInterval(() => {
      CheckOrderPayedFx()
        .then((response: any) =>{
          console.log('response')
          console.log(response?.data)

          if (response?.data?.status === "succeeded"){
            onSetNotification({
              title: 'Спасибо за покупку',
              message: 'Заказ успешно оплачен'
            })
            form?.resetFields()
            onSelectCity(null)
            onSelectDelivery('cd')
            onChangeIsOpenCheckout(false)
            resetBucket()
            changeActiveOrder(null)
          } else if(response?.data?.status === "canceled"){
            onSetNotification({
              title: 'Произошла ошибка',
              message: 'Произошла ошибка при оплаче заказа'
            })
            form?.resetFields()
            onSelectCity(null)
            onSelectDelivery('cd')
            onChangeIsOpenCheckout(false)
            resetBucket()
            changeActiveOrder(null)
          }
        })
        .catch((e) =>{
          console.log('e')
          console.log(e)
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);


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
              form={form}
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
                  onChange={(e, y: any) => onSelectCity({ id: y?.key, city: y?.children, region: y?.data } as any)}
                  showSearch
                  onSearch={(e) => setSearchCity(e)}
                >
                  {cities?.map((option: any) => {
                    return (
                      <Select.Option key={option?.uuid?.toString()} value={option?.uuid?.toString()} data={option?.region}>
                        {`${option?.city}, ${option?.region}`}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              {!!selectedCities
                ?
                <Radio.Group onChange={(e) => onSelectDelivery(e.target.value)} value={selectedDelivery}>
                  <Space direction="vertical">
                    {
                      bucketCalculated?.['cd']?.cost &&
                      <Radio value={'cd'}>
                          <div className="checkout-modal-main-form-radio">
                              СДЭК, <span>от {bucketCalculated?.['cd']?.days} дней, от {bucketCalculated?.['cd']?.cost} руб.</span>
                          </div>
                      </Radio>
                    }
                    {
                      bucketCalculated?.['pr']?.cost && isRussianPostAvaible &&
                      <Radio value={'pr'}>
                          <div className="checkout-modal-main-form-radio">
                              Доставка почтой
                              России, <span> от {bucketCalculated?.['pr']?.days} дней, от {bucketCalculated?.['pr']?.cost} руб.</span>
                          </div>
                      </Radio>
                    }
                  </Space>
                </Radio.Group>
                :
                <p style={{ color: 'red', fontSize: 16 }}>
                  В данном городе нет доставки
                </p>
              }

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
                <Select
                  style={{
                    width: '100%'
                  }}
                  className={'test-test'}
                  placeholder={'Улица'}
                  filterOption={false}
                  value={selectedStreet}
                  onChange={(e) => onSelectStreet(e)}
                  showSearch
                  onSearch={(e) => setSearchStreet(e)}
                >
                  {streets?.map((option: any) => {
                    return (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    );
                  })}
                </Select>
                {/*<Input*/}
                {/*  placeholder={'Улица'}*/}
                {/*  style={{*/}
                {/*    height: 38*/}
                {/*  }}*/}
                {/*/>*/}
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
                  {/*<Input*/}
                  {/*  placeholder={'Дом'}*/}
                  {/*  style={{*/}
                  {/*    height: 38*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <Select
                    style={{
                      width: '100%'
                    }}
                    className={'test-test'}
                    placeholder={'Дом'}
                    filterOption={false}
                    value={selectedDelivery}
                    onChange={(e) => onSelectBuilding(e)}
                    showSearch
                    onSearch={(e) => setSearchBuilding(e)}
                  >
                    {building?.map((option: any) => {
                      return (
                        <Select.Option key={option} value={option}>
                          {option}
                        </Select.Option>
                      );
                    })}
                  </Select>
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
                  value={isAgree}
                  onChange={(e) => setIsAgree(e?.target?.checked)}
                >
                  Я согласен/а с политикой конфиденциальности
                </Checkbox>
              </div>

              <div className="checkout-modal-main-sum">
                <p>
                  Сумма: {' '}
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'} />
                      : `${bucketCalculated?.price} руб`
                  }
                </p>
                {
                  !!bucketCalculated?.[selectedDelivery]?.cost &&
                  <p>
                    {
                      selectedDelivery === 'cd' ? 'СДЭК' : 'Почта России'
                    }: {' '}
                    {
                      isLoadingCalculate
                        ? <Skeleton.Button active={false} size={'small'} />
                        : `${bucketCalculated?.[selectedDelivery]?.cost} руб`
                    }
                  </p>
                }
                {
                  selectedCities?.city &&
                  <p>
                    {
                      isLoadingCalculate
                        ? <Skeleton.Button active={false} size={'small'} />
                        : `${selectedCities?.city}`
                    }
                  </p>
                }
                <p>
                  Итоговая сумма: {' '}
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'} />
                      : `${
                        Number(bucketCalculated?.price || 0) +
                        (bucketCalculated?.[selectedDelivery]?.cost ? Number(bucketCalculated?.[selectedDelivery]?.cost) : 0)
                      } руб`
                  }
                </p>
              </div>

              <div className="checkout-modal-main-form-button">
                <CustomButton
                  disable={isDisablePay}
                  isLoading={isLoadingCheckout}
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
              <LineBlock />
            </div>
            <div className="checkout-modal-main-order-list">
              {
                bucket?.map((item: any) =>
                  <BucketCard isWithCounter={true} withTimerLogic={true} item={item} />
                )
              }
            </div>
            <div className="checkout-modal-main-order-mob">
              <LineBlock />
            </div>
            <div className="checkout-modal-main-order-sum">
              <h2>
                Сумма к оплате: {' '}
                {
                  isLoadingCalculate
                    ? <Skeleton.Button active={false} size={'small'} />
                    : `${bucketCalculated?.price} руб`
                }
              </h2>
              <p>
                Сумма: {' '}
                {
                  isLoadingCalculate
                    ? <Skeleton.Button active={false} size={'small'} />
                    : `${bucketCalculated?.price} руб`
                }
              </p>
              {
                !!bucketCalculated?.[selectedDelivery]?.cost &&
                <p>
                  {
                    selectedDelivery === 'cd' ? 'СДЭК' : 'Почта России'
                  }: {' '}
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'} />
                      : `${bucketCalculated?.[selectedDelivery]?.cost} руб`
                  }
                </p>
              }
              {
                selectedCities?.city &&
                <p>
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'} />
                      : `${selectedCities?.city}`
                  }
                </p>
              }
              <p>
                Итоговая сумма: {' '}
                {
                  isLoadingCalculate
                    ? <Skeleton.Button active={false} size={'small'} />
                    : `${
                      Number(bucketCalculated?.price || 0) +
                      (bucketCalculated?.[selectedDelivery]?.cost ? Number(bucketCalculated?.[selectedDelivery]?.cost) : 0)
                    } руб`
                }
              </p>
            </div>
          </div>
        </div>
      </MaxWithLayout>
    </div>
  );
};

export default CheckoutModal;
