import React, { FC, PropsWithChildren, useState } from 'react';
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

const CustomInput: FC<PropsWithChildren<any>> = ({
                                                   backgroundColor = 'rgba(231, 207, 126, 1)',
                                                   color = 'rgba(29, 29, 27, 1)',
                                                   placeholderColor = 'dark',
                                                   iconColor = '#1D1D1B'
                                                 }) => {

  const [value, setValue] = useState<any>();
  const router = useRouter()

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/search?value=${value}`)
    }
  };

  return (
    <div className={`input ${placeholderColor === 'light' && 'input-light'}`}>
      <Input
        value={value}
        onChange={(e: any) => setValue(e?.target?.value)}
        style={{
          backgroundColor,
          color,
        }}
        onKeyDown={handleKeyPress}
        placeholder={'Поиск по сайту'}
      />
      {value &&
      <Link href={`/search?value=${value}`}>
          {/*<SearchIcon color={iconColor} />*/}
      </Link>
      }
    </div>
  );
};

export default CustomInput;
