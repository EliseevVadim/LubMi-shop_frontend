import React, { FC, PropsWithChildren } from 'react';
import { Pagination, PaginationProps } from "antd";
// import ArrowToRight from "../../assets/icons/pagination/ArrowToRight";
// import ArrowToLeft from "../../assets/icons/pagination/ArrowToLeft";

const CustomPagination: FC<PropsWithChildren<any>> = ({
                            total,
                            limit,
                            page,
                            changePage
                          }) => {

  // const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  //   if (type === 'prev') {
  //     return <ArrowToLeft />;
  //   }
  //   if (type === 'next') {
  //     return <ArrowToRight />;
  //   }
  //   return originalElement;
  // };

  return (
    <Pagination
      className='pagination'
      onChange={(page, pageSize): any => changePage(page)}
      defaultCurrent={1}
      current={page}
      pageSize={limit}
      total={total}
      showSizeChanger={false}
      // itemRender={itemRender}
    />
  );
};

export default CustomPagination;
