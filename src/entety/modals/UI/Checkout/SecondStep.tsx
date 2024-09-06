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
  BuildingFX,
  CalculateBucketFx, changeActiveOrder, CheckOrderPayedFx, CheckRussianPostFx,
  onSelectBuilding,
  onSelectCity,
  onSelectDelivery,
  onSelectPVS,
  onSelectStreet,
  PVSFX, resetBucket,
  StreetFX
} from "@/entety/client/bucket/model";
import CustomButton from "@/components/client/common/CustomButton";
import LineBlock from "@/components/client/common/LineBlock";
import BucketCard from "@/components/client/bucket/BucketCard";
import {useUnit} from "effector-react";
import {useDebounce} from "use-debounce";
import CitySelect from "@/components/client/selectors/CitySelect";
import StreetSelect from "@/components/client/selectors/StreetSelect";
import BuildingSelect from "@/components/client/selectors/BuildingSelect";
import PVZSelect from "@/components/client/selectors/PVZSelect";

const SecondStep = ({
                      step,
                      setStep,
                    }: any) => {

  const [form] = Form.useForm<{}>();
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

  const [isAgree, setIsAgree] = useState<any>(false);

  const isDisablePay = !selectedCities || !isAgree || !selectedDelivery

  const [searchPVS, setSearchPVS] = useState<any>('');
  const [searchStreet, setSearchStreet] = useState<any>('');
  const [searchBuilding, setSearchBuilding] = useState<any>('');
  const [debouncedSearchPVS] = useDebounce(searchPVS, 500);
  const [debouncedSearchStreet] = useDebounce(searchStreet, 500);
  const [debouncedSearchBuilding] = useDebounce(searchBuilding, 500);

  const searchPVSData = pvs.filter((item: any) => debouncedSearchPVS
    ? String(item?.location?.address).toLowerCase()?.includes(String(debouncedSearchPVS).toLowerCase())
    : true
  )

  useEffect(() => {
    if (selectedCities?.id) {
      StreetFX(debouncedSearchStreet)
      PVSFX(debouncedSearchStreet)
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

  const onFinish = () => {
    const values: any = form.getFieldsValue()

    let data: any = {
      delivery: selectedDelivery,
      cu_first_name: values?.name,
      cu_last_name: values?.surname,
      cu_phone: values?.phone,
      cu_email: values?.email,
      cu_city_uuid: selectedCities?.id,
      cu_city: selectedCities?.city,
      cu_fullname: `${values?.surname} ${values?.name}`,
      // cu_fullname: values?.fullName,
      cu_confirm: true,
      scart: bucket?.map((item: any) => ({ppk: item.article, size_id: item?.size?.id, quantity: item?.quantity}))
    }

    if (selectedDelivery === 'cp') {
      // @ts-ignore
      data.delivery_point = selectedPVS?.id
    } else {
      data.cu_street = selectedStreet || null
      data.cu_building = selectedBuilding || null
      data.cu_apartment = values?.apartment || null
      data.cu_entrance = values?.entrance || null
      data.cu_floor = values?.floor || null
    }

    BucketCheckoutFx(data)
      .then((res) => {
        if (res?.success) {
          if (res?.redirect) {
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

  useEffect(() => {
    const interval = setInterval(() => {
      CheckOrderPayedFx()
        .then((response: any) => {
          console.log('response')
          console.log(response?.data)

          if (response?.data?.status === "CONFIRMED") {
            onSetNotification({
              title: 'Спасибо за покупку!',
              message: 'Заказ успешно оплачен. Отправка заказов осуществляется еженедельно в понедельник и четверг.\n' +
                'Отследить передвижение заказа вы можете в приложении транспортной компании.\n\n' +
                'По дополнительным вопросам обращайтесь в службу поддержки.',
              isCenter: true
            })
            form?.resetFields()
            onSelectCity(null)
            onSelectDelivery('cd')
            onChangeIsOpenCheckout(false)
            resetBucket()
            changeActiveOrder(null)
            onSelectPVS(null)
          } else if (
            response?.data?.status === "CANCELED" ||
            response?.data?.status === "DEADLINE_EXPIRED" ||
            response?.data?.status === "REJECTED" ||
            response?.data?.status === "AUTH_FAIL"
          ) {
            onSetNotification({
              title: 'Произошла ошибка',
              message: 'Произошла ошибка при оплате заказа'
            })
            form?.resetFields()
            onSelectCity(null)
            onSelectDelivery('cd')
            onChangeIsOpenCheckout(false)
            resetBucket()
            changeActiveOrder(null)
          }
        })
        .catch((e) => {
          console.log('e')
          console.log(e)
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <>
      <div className="checkout-modal-top">
        <div className="checkout-modal-top-back" onClick={() => setStep(true)}>
          <ProductArrowToLeft/>
          Назад
        </div>
        <div className="checkout-modal-top-close" onClick={() => {
          setStep(true)
          onChangeIsOpenCheckout(false)
        }}>
          <CrossIcon/>
        </div>
      </div>
      <div className="checkout-modal-main" ref={modalRef}>
        <Form
          layout={"vertical"}
          form={form}
          // onFinish={onFinish}
        >
          <div className="checkout-modal-main-form">
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

            <Form.Item
              name="email"
              rules={
                [
                  {
                    required: true,
                    message: "Данные введены неверно",
                  },
                  {
                  type: 'email',
                  message: "Введен неверный формат электронной почты",
                }]
              }
            >
              <Input
                // type={'email'}
                placeholder={'Электронная почта'}
                style={{
                  height: 38
                }}
              />
            </Form.Item>

            {!!selectedCities && (bucketCalculated?.['cp']?.cost || bucketCalculated?.['cd']?.cost || bucketCalculated?.['pr']?.cost) &&
                <>
                  {/*<h3>*/}
                  {/*    Получатель*/}
                  {/*</h3>*/}

                  {/*<Form.Item*/}
                  {/*    name="fullName"*/}
                  {/*    rules={[*/}
                  {/*      {*/}
                  {/*        required: true,*/}
                  {/*        message: "Данные введены неверно",*/}
                  {/*      },*/}
                  {/*    ]}*/}
                  {/*>*/}
                  {/*    <Input*/}
                  {/*        placeholder={'Введите Ваше ФИО полностью'}*/}
                  {/*        style={{*/}
                  {/*          height: 38*/}
                  {/*        }}*/}
                  {/*    />*/}
                  {/*</Form.Item>*/}

                  {
                    selectedDelivery !== 'cp'
                      ?
                      <>
                        <Form.Item
                          name="street"
                          rules={[
                            {
                              required: selectedDelivery !== 'cp',
                              message: "Данные введены неверно",
                            },
                          ]}
                        >
                          <StreetSelect
                            selectedStreet={selectedStreet}
                            onSelectStreet={(e: any) => {
                              onSelectStreet(e)
                              form.setFieldValue('street', e)
                            }}
                            setSearchStreet={setSearchStreet}
                            streets={streets}
                          />
                        </Form.Item>

                        <div className="checkout-modal-main-form-block">
                          <Form.Item
                            name="building"
                            rules={[
                              {
                                required: selectedDelivery !== 'cp',
                                message: "Данные введены неверно",
                              },
                            ]}
                          >
                            <BuildingSelect
                              selectedBuilding={selectedDelivery}
                              onSelectBuilding={(e: any) => {
                                onSelectBuilding(e)
                                form.setFieldValue('building', e)
                              }}
                              setSearchBuilding={setSearchBuilding}
                              buildings={building}
                            />
                          </Form.Item>
                          <Form.Item
                            name="apartment"
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
                          >
                            <Input
                              placeholder={'Этаж'}
                              style={{
                                height: 38
                              }}
                            />
                          </Form.Item>
                        </div>
                      </>
                      :
                      <Form.Item
                        name="psv"
                        rules={[
                          {
                            required: true,
                            message: "Данные введены неверно",
                          },
                        ]}
                      >
                        <PVZSelect
                          selectedPVS={selectedPVS}
                          onSelectPVS={(e: any) => {
                            onSelectPVS(e)
                            form.setFieldValue('psv', e)
                          }}
                          setSearchPVS={setSearchPVS}
                          searchPVSData={searchPVSData}
                        />
                        {/*<Select*/}
                        {/*  style={{*/}
                        {/*    width: '100%'*/}
                        {/*  }}*/}
                        {/*  className={'test-test'}*/}
                        {/*  placeholder={'Выберите ПВЗ'}*/}
                        {/*  filterOption={false}*/}
                        {/*  value={selectedPVS}*/}
                        {/*  onChange={(e, y: any) => onSelectPVS({id: y?.key} as any)}*/}
                        {/*  showSearch*/}
                        {/*  onSearch={(e) => setSearchPVS(e)}*/}
                        {/*>*/}
                        {/*  {searchPVSData?.map((option: any) => {*/}
                        {/*    return (*/}
                        {/*      <Select.Option key={option?.code?.toString()} value={option?.code?.toString()}>*/}
                        {/*        {option?.location?.address}*/}
                        {/*      </Select.Option>*/}
                        {/*    );*/}
                        {/*  })}*/}
                        {/*</Select>*/}
                      </Form.Item>
                  }
                </>
            }

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
                    ? <Skeleton.Button active={false} size={'small'}/>
                    : `${bucketCalculated?.price} руб`
                }
              </p>
              {
                !!bucketCalculated?.[selectedDelivery]?.cost &&
                  <p>
                    {
                      selectedDelivery === 'cd'
                        ? 'СДЭК (оплачивается при получении)'
                        : selectedDelivery === 'cp'
                          ? 'СДЭК (ПВЗ) (оплачивается при получении)'
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
                      (!bucketCalculated?.[selectedDelivery]?.cod && bucketCalculated?.[selectedDelivery]?.cost
                          ? Number(bucketCalculated?.[selectedDelivery]?.cost)
                          : 0
                      )
                    } руб`
                }
              </p>
            </div>

            <div className="checkout-modal-main-form-button">
              <CustomButton
                onClick={() => {
                  form.validateFields()
                    .then(() => {
                      console.log('ok')
                      onFinish()
                    })
                    .catch(() => {
                      console.log('error')
                    })

                }}
                disable={isDisablePay}
                isLoading={isLoadingCheckout}
                title={'Оформить заказ'}
                padding={'24px 0'}
                maxWidth={'100%'}
                backColor={'rgba(34, 34, 34, 1)'}
                color={'rgba(255, 255, 255, 1)'}
              />
            </div>
          </div>
        </Form>

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
                      ? 'СДЭК (оплачивается при получении)'
                      : selectedDelivery === 'pr'
                        ? 'Почта России'
                        : 'СДЭК (ПВЗ) (оплачивается при получении)'
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
                    (!bucketCalculated?.[selectedDelivery]?.cod && bucketCalculated?.[selectedDelivery]?.cost
                        ? Number(bucketCalculated?.[selectedDelivery]?.cost)
                        : 0
                    )
                  } руб`
              }
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondStep;