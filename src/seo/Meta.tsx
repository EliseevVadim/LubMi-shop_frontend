import React, { FC, PropsWithChildren, useState } from 'react';
import Head from "next/head";

const Meta: FC<PropsWithChildren<IMeta>> = ({
                                              title,
                                              children,
                                            }) => {

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="LubMi – это бренд зародившийся в мечтах маленькой девочки, которая, рисуя наряды своим куклам фантазировала о собственной коллекции одежды. И теперь, когда девочка выросла, её мечта сбылась!"/>
      </Head>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Meta;
