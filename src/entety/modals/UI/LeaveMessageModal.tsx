import React, {useEffect, useState} from 'react';
import {useUnit} from "effector-react";
import {
  $isOpenLeaveMessage,
  $isOpenLeaveMessageSize,
  onChangeIsOpenLeaveMessage,
  onChangeIsOpenLeaveMessageSize
} from "../model/index";
import {Form, Input, Modal} from "antd";
import InputMask from "react-input-mask";
import CustomButton from "../../../components/client/common/CustomButton";
import {api} from "../../../api/ApiWithoutToken";
import {postFeedBack} from "../api/index";
import {useAlert} from "../../../controllers/AlertNotification/index";

const LeaveMessageModal = () => {

  const [isOpenLeaveMessage, isOpenLeaveMessageSize] = useUnit([$isOpenLeaveMessage, $isOpenLeaveMessageSize])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [form] = Form.useForm();
  const uAlert = useAlert()

  const onFinish = (values: any) => {
    setIsLoading(true)

    let data: any = {
      ppk: isOpenLeaveMessage,
      phone: values?.phone,
      email: values?.email,
    }

    if (isOpenLeaveMessageSize) {
      data.size = isOpenLeaveMessageSize
    }

    postFeedBack(data)
      .then(() => {
        uAlert({
          message: 'Запрос успешно отправлен'
        })
        form.resetFields()
        onChangeIsOpenLeaveMessageSize('')
      })
      .catch(() => {
        uAlert({
          message: 'Произошла ошибка при попытке отправить запрос'
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }


  useEffect(() => {
    if (isOpenLeaveMessage) {
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
  }, [isOpenLeaveMessage])

  return (
    <Modal
      width={680}
      title=""
      open={isOpenLeaveMessage}
      onCancel={() => {
        onChangeIsOpenLeaveMessage(false)
        onChangeIsOpenLeaveMessageSize('')
      }}
      footer={null}
      style={{
        zIndex: 990,
      }}
    >
      <div className="form-title">
        Сообщить о поступлении товара
      </div>
      <div className="form-desc">
        Выберите удобный способ для оповещения о повторном наличии данного товара
      </div>

      <Form
        form={form}
        layout={"vertical"}
        onFinish={onFinish}
        className="leave-message"
      >
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
            placeholder='Введите Ваш номер телефона'
            style={{
              backgroundColor: 'transparent',
              border: 'none',
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
          rules={[
            {
              required: true,
              message: "Данные введены неверно",
            },
            {
              type: 'email',
              message: 'Введите корректный адрес электронной почты',
            },
          ]}
        >
          <Input
            placeholder={'Введите Ваш email'}
            style={{
              height: 47
            }}
          />
        </Form.Item>

        <div className="form-button">
          <CustomButton
            fontWeight={100}
            isLoading={isLoading}
            title={'Получить уведомление'}
            padding={'24px 0'}
            maxWidth={359}
            backColor={'rgba(34, 34, 34, 1)'}
            color={'rgba(255, 255, 255, 1)'}
          />
        </div>

      </Form>
    </Modal>
  );
};

export default LeaveMessageModal;
