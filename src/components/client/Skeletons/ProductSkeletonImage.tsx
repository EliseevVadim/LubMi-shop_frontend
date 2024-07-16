import React, {useState} from 'react';
import {Skeleton} from 'antd';
import Image from 'next/dist/client/legacy/image';
import ContentLoader from "react-content-loader"

const ProductSkeletonImage = ({src, alt, fill, objectFit, ...props}: any) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <ContentLoader
          speed={2}
          width={'100%'}
          height={'100%'}
          viewBox="0 0 1000 1000"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="0" y="0" rx="0" ry="0" width="1000" height="1000"/>
        </ContentLoader>
      )}
      <Image
        src={src}
        alt={alt}
        layout={'fill'}
        objectFit={'cover'}
        onLoadingComplete={handleImageLoad}
        style={{display: loaded ? 'block' : 'none'}}
        {...props}
      />
    </>
  );
};

export default ProductSkeletonImage;
