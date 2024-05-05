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
      </Head>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Meta;
