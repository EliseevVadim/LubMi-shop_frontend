import React, { FC, PropsWithChildren } from 'react';

const MaxWithLayout: FC<PropsWithChildren<any>> = ({
                                                     children,
                                                   }) => {

  return (
    <div
      style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 20px',
        width: '100%',
        height: '100%'
      }}
    >
      {children}
    </div>
  );
};

export default MaxWithLayout;
