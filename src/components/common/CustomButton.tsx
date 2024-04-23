import React, { FC, PropsWithChildren } from 'react';
import { LoadingOutlined } from "@ant-design/icons/lib";
import { Spin } from "antd";

const CustomButton: FC<PropsWithChildren<any>> = ({
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
                                                    color = 'rgba(34, 34, 34, 1)'
                                                  }) => {
  return (
    <button
      onClick={onClick}
      className='gold-button'
      style={{
        pointerEvents: isLoading ? 'none' : 'auto',
        opacity: isLoading ? 0.5 : 1,
        padding,
        width,
        maxWidth,
        background: backColor ? backColor : isTransperent && 'transparent',
        border: isWithBorder ? '1px solid rgba(0, 0, 0, 1)' : 'none',
        color: color,
        fontWeight: 300,
        fontSize: 24,
        borderRadius: 6
      }}
    >
      {
        isLoading
          ?
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 25, color: '#000' }} />}
          />
          : title

      }
    </button>
  );
};

export default CustomButton;
