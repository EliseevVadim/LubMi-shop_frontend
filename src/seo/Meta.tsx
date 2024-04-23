import React, { FC, PropsWithChildren, useState } from 'react';
import Head from "next/head";

const Meta: FC<PropsWithChildren<IMeta>> = ({
                                              title,
                                              children,
                                            }) => {

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        {children}
      </main>
    </>
  );
};

export default Meta;
