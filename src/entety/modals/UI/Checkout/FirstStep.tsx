import React, {useEffect, useRef, useState} from 'react';
import {$isOpenCheckout, onChangeIsOpenCheckout, onSetNotification} from "@/entety/modals/model";
import ProductArrowToLeft from "@/assets/icons/ProductArrowToLeft";
import CrossIcon from "@/assets/icons/CrossIcon";
import {Checkbox, Form, Input, Radio, Select, Skeleton, Space} from "antd";
import InputMask from "react-input-mask";
import {
  $activeOrderId,
  $bucket,
  $bucketCalculated,
  $building,
  $cities,
  $isRussianPostAvaible,
  $pvs,
  $selectedBuilding,
  $selectedCities,
  $selectedDelivery,
  $selectedPVS,
  $selectedStreet,
  $streets,
  BucketCheckoutFx,
  CalculateBucketFx,
  CityFX,
  onSelectCity,
  onSelectDelivery,

} from "@/entety/client/bucket/model";
import CustomButton from "@/components/client/common/CustomButton";
import LineBlock from "@/components/client/common/LineBlock";
import BucketCard from "@/components/client/bucket/BucketCard";
import {useUnit} from "effector-react";
import {useDebounce} from "use-debounce";
import CitySelect from "@/components/client/selectors/CitySelect";

const FirstStep = ({
                     step,
                     setStep,
                   }: any) => {

  const modalRef = useRef<any>(null);


  const [
    isOpenCheckout,
    selectedCities,
    selectedPVS,
    cities,
    pvs,
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
    isRussianPostAvaible,
  ] = useUnit([
    $isOpenCheckout,
    $selectedCities,
    $selectedPVS,
    $cities,
    $pvs,
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
    $isRussianPostAvaible,
  ])

  const [searchCity, setSearchCity] = useState<any>('');
  const [debouncedSearchCity] = useDebounce(searchCity, 500);

  useEffect(() => {
    CityFX(debouncedSearchCity)
  }, [debouncedSearchCity])

  useEffect(() => {
    modalRef.current.scrollTo({
      top: -1000,
      left: 0,
    });

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
  }, [isOpenCheckout, step])

  const handleFocus = () => {
    console.log('handleFocus')
    document.body.classList.add('overflow-hidden');
  };

  const handleBlur = () => {
    console.log('handleBlur')
    document.body.classList.remove('overflow-hidden');
  };

  return (
    <>
      <div className="checkout-modal-top">
        <div className="checkout-modal-top-back" onClick={() => onChangeIsOpenCheckout(false)}>
          <ProductArrowToLeft/>
          Назад
        </div>
        <div className="checkout-modal-top-close" onClick={() => onChangeIsOpenCheckout(false)}>
          <CrossIcon/>
        </div>
      </div>
      <div className="checkout-modal-main" ref={modalRef} id={'testtest'}>
        <div className="checkout-modal-main-form">
          <h3 style={{marginTop: 0}}>
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
            <CitySelect
              selectedCities={selectedCities}
              onSelectCity={onSelectCity}
              setSearchCity={setSearchCity}
              cities={cities}
            />
            {/*<Select*/}
            {/*  onFocus={handleFocus}*/}
            {/*  onBlur={handleBlur}*/}
            {/*  id={'select-city'}*/}
            {/*  style={{*/}
            {/*    width: '100%'*/}
            {/*  }}*/}
            {/*  virtual={false}*/}
            {/*  className={'test-test'}*/}
            {/*  placeholder={'Введите Ваш город'}*/}
            {/*  filterOption={false}*/}
            {/*  value={selectedCities}*/}
            {/*  onChange={(e, y: any) => onSelectCity({id: y?.key, city: y?.children, region: y?.data} as any)}*/}
            {/*  showSearch*/}
            {/*  onSearch={(e) => setSearchCity(e)}*/}
            {/*  getPopupContainer={(e) => e}*/}
            {/*  listHeight={200}*/}
            {/*>*/}
            {/*  {cities?.map((option: any) => {*/}
            {/*    return (*/}
            {/*      <Select.Option key={option?.uuid?.toString()} value={option?.uuid?.toString()}*/}
            {/*                     data={option?.region}>*/}
            {/*        {`${option?.city}, ${option?.region}`}*/}
            {/*      </Select.Option>*/}
            {/*    );*/}
            {/*  })}*/}
            {/*</Select>*/}
          </Form.Item>
          {
            isLoadingCalculate
              ?
              <Skeleton.Input active={true} size={'large'} block={true} style={{
                height: 100
              }}/>
              :
              !!selectedCities
                ?
                <Radio.Group onChange={(e) => onSelectDelivery(e.target.value)} value={selectedDelivery}>
                  <Space direction="vertical">
                    {
                      bucketCalculated?.['cd']?.cost &&
                        <Radio value={'cd'}>
                            <div className="checkout-modal-main-form-radio">
                                СДЭК
                                (курьер), <span>от {bucketCalculated?.['cd']?.days} дней, от {bucketCalculated?.['cd']?.cost} руб.</span>
                            </div>
                        </Radio>
                    }
                    {
                      bucketCalculated?.['cp']?.cost &&
                        <Radio value={'cp'}>
                            <div className="checkout-modal-main-form-radio">
                                СДЭК
                                (ПВЗ), <span>от {bucketCalculated?.['cp']?.days} дней, от {bucketCalculated?.['cp']?.cost} руб.</span>
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
                <p style={{color: 'red', fontSize: 16}}>
                  В данном городе нет доставки
                </p>
          }

          <div className="checkout-modal-main-sum">
            <p>
              Сумма: {' '}
              {
                isLoadingCalculate
                  ? <Skeleton.Button active={false} size={'small'}/>
                  : `${bucketCalculated?.price} руб`
              }
            </p>
            {
              !!bucketCalculated?.[selectedDelivery]?.cost &&
                <p>
                  {
                    selectedDelivery === 'cd'
                      ? 'СДЭК'
                      : selectedDelivery === 'cp'
                        ? 'СДЭК (ПВЗ)'
                        : 'Почта России'
                  }: {' '}
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'}/>
                      : `${bucketCalculated?.[selectedDelivery]?.cost} руб`
                  }
                </p>
            }
            {
              selectedCities?.city &&
                <p>
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'}/>
                      : `${selectedCities?.city}`
                  }
                </p>
            }
            <p>
              Итоговая сумма: {' '}
              {
                isLoadingCalculate
                  ? <Skeleton.Button active={false} size={'small'}/>
                  : `${
                    Number(bucketCalculated?.price || 0) +
                    (bucketCalculated?.[selectedDelivery]?.cost ? Number(bucketCalculated?.[selectedDelivery]?.cost) : 0)
                  } руб`
              }
            </p>
          </div>

          <div className="checkout-modal-main-form-button">
            <CustomButton
              disable={!selectedCities?.id}
              isLoading={isLoadingCheckout}
              title={'Продолжить'}
              padding={'24px 0'}
              maxWidth={'100%'}
              backColor={'rgba(34, 34, 34, 1)'}
              color={'rgba(255, 255, 255, 1)'}
              onClick={() => setStep(false)}
            />
          </div>

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
                <BucketCard isWithCounter={true} withTimerLogic={true} item={item}/>
              )
            }
          </div>
          <div className="checkout-modal-main-order-mob">
            <LineBlock/>
          </div>
          <div className="checkout-modal-main-order-sum">
            <h2>
              Сумма к оплате: {' '}
              {
                isLoadingCalculate
                  ? <Skeleton.Button active={false} size={'small'}/>
                  : `${bucketCalculated?.price} руб`
              }
            </h2>
            <p>
              Сумма: {' '}
              {
                isLoadingCalculate
                  ? <Skeleton.Button active={false} size={'small'}/>
                  : `${bucketCalculated?.price} руб`
              }
            </p>
            {
              !!bucketCalculated?.[selectedDelivery]?.cost &&
                <p>
                  {
                    selectedDelivery === 'cd'
                      ? 'СДЭК'
                      : selectedDelivery === 'pr'
                        ? 'Почта России'
                        : 'СДЭК (ПВЗ)'
                  }: {' '}
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'}/>
                      : `${bucketCalculated?.[selectedDelivery]?.cost} руб`
                  }
                </p>
            }
            {
              selectedCities?.city &&
                <p>
                  {
                    isLoadingCalculate
                      ? <Skeleton.Button active={false} size={'small'}/>
                      : `${selectedCities?.city}`
                  }
                </p>
            }
            <p>
              Итоговая сумма: {' '}
              {
                isLoadingCalculate
                  ? <Skeleton.Button active={false} size={'small'}/>
                  : `${
                    Number(bucketCalculated?.price || 0) +
                    (bucketCalculated?.[selectedDelivery]?.cost ? Number(bucketCalculated?.[selectedDelivery]?.cost) : 0)
                  } руб`
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstStep;