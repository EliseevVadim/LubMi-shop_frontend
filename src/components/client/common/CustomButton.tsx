import React, { FC, PropsWithChildren } from 'react';
import { LoadingOutlined } from "@ant-design/icons/lib";
import { Spin } from "antd";

interface IButton {
  isLoading?: boolean,
  title?: string
  padding?: string,
  width?: string,
  maxWidth?: string | number,
  onClick?: any,
  isTransperent?: boolean,
  isWithBorder?: boolean,
  backColor?: any,
  color?: string,
  border?: string,
  icon?: any,
  fontWeight?: any,
  disable?: any
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
                                                        disable = false,
                                                        backColor = 'rgba(255,255,255)',
                                                        color = 'rgba(34, 34, 34, 1)',
                                                        border = 'none',
                                                        icon,
                                                        fontWeight = 300,
                                                      }) => {
  return (
    <button
      disabled={disable}
      onClick={onClick}
      className='custom-button'
      style={{
        pointerEvents: isLoading || disable ? 'none' : 'auto',
        opacity: isLoading || disable? 0.5 : 1,
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
          <div style={{padding: 15}}>
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 25, color: '#fff' }} />}
            />
          </div>
          : <p
            style={{
              padding,
              color: color,
              fontSize: 24,
              width: '100%',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 20,
              fontWeight
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
