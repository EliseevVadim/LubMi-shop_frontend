import React, { useEffect } from 'react';
import { useUnit } from "effector-react";
import { $notification, onResetNotification, onSetNotification } from "../model/index";
import { Modal } from "antd";
import CustomButton from "../../../components/client/common/CustomButton";

const NotificationModal = () => {

  const notification = useUnit($notification)

  useEffect(() => {
    if (notification?.title) {
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
  }, [notification?.title])

  const handleClickButton = () =>{
    const link = document.createElement('a');
    link.href = 'https://t.me/lubmi_ru';
    link.target = '_blank';
    link.click();
  }

  const formattedMessage = notification?.message?.split('\n').map((line: any, index: any) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
  return (
    <Modal
      width={665}
      title=""
      open={!!notification?.title}
      onCancel={() => onResetNotification()}
      footer={null}
    >
      <div className="notification-title">
        {notification.title}
      </div>
      <div className="notification-text" style={{textAlign: notification?.isCenter ? 'left' : 'center'}}>
        {formattedMessage}
      </div>
      <CustomButton
        onClick={handleClickButton}
        fontWeight={100}
        title={'Перейти в чат со службой поддержки'}
        padding={'24px 0'}
        maxWidth={'100%'}
        backColor={'rgba(34, 34, 34, 1)'}
        color={'rgba(255, 255, 255, 1)'}
      />
    </Modal>
  );
};

export default NotificationModal;
