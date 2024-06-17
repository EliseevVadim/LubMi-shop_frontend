import React, {FC, PropsWithChildren} from 'react';

const MaxWithLayout: FC<PropsWithChildren<any>> = ({
                                                       children,
                                                       padding = '0 20px',
                                                   }) => {

    return (
        <div
            style={{
                maxWidth: 1400,
                margin: '0 auto',
                padding: padding,
                width: '100%',
                height: '100%',
                position: "relative"
            }}
        >
            {children}
        </div>
    );
};

export default MaxWithLayout;
