import React, { useEffect } from 'react';
import { useUnit } from "effector-react";
import { $isOpenLeaveMessage, onChangeIsOpenLeaveMessage } from "../model/index";
import { Form, Input, Modal } from "antd";
import InputMask from "react-input-mask";
import CustomButton from "../../../components/common/CustomButton";

const LeaveMessageModal = () => {

  const isOpenLeaveMessage = useUnit($isOpenLeaveMessage)

  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    form.resetFields()
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
      onCancel={() => onChangeIsOpenLeaveMessage(false)}
      footer={null}
    >
      <div className="form-title">
        Сообщить о поступлении товара
      </div>
      <div className="form-desc">
        Выберите удобный способ для оповещения о повторном наличии данного товара
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
            bordered={false}
            placeholder={'Введите Ваш email'}
            style={{
              height: 47
            }}
          />
        </Form.Item>

        <div className="form-button">
          <CustomButton
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
