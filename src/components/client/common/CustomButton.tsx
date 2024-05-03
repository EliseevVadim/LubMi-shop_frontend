import React, { FC, PropsWithChildren } from 'react';
import { LoadingOutlined } from "@ant-design/icons/lib";
import { Spin } from "antd";

interface IButton {
  isLoading: boolean,
  title: string
  padding: string,
  width: string,
  maxWidth: string,
  onClick: () => {},
  isTransperent: boolean,
  isWithBorder: boolean,
  backColor: string,
  color: string,
  border: string,
  icon?: any,
}

const CustomButton: FC<PropsWithChildren<IButton>> = ({
                                                        isLoading = false,
                                                        title = '',
                                                        padding = '22px 30px',
                                                        width = '100%',
                                                        maxWidth = 200,
                                                        onClick = () => {
                                                        },
                                                        isTransperent = false,
                                                        isWithBorder = false,
                                                        backColor = 'rgba(255,255,255)',
                                                        color = 'rgba(34, 34, 34, 1)',
                                                        border = 'none',
                                                        icon,
                                                      }) => {
  return (
    <button
      onClick={onClick}
      className='custom-button'
      style={{
        pointerEvents: isLoading ? 'none' : 'auto',
        opacity: isLoading ? 0.5 : 1,
        width,
        maxWidth,
        background: backColor ? backColor : isTransperent && 'transparent',
        border,
        borderRadius: 6,
      }}
    >
      {
        isLoading
          ?
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 25, color: '#000' }} />}
          />
          : <p
            style={{
              padding,
              color: color,
              fontWeight: 300,
              fontSize: 24,
              width: '100%',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
            }}
          >
            {title}
            {icon}
          </p>

      }
    </button>
  );
};

export default CustomButton;
