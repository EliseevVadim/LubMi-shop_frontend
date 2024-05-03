import React, { FC, PropsWithChildren } from 'react';
import { Pagination, PaginationProps } from "antd";
import PaginationArrowRoLeft from "../../../assets/icons/PaginationArrowRoLeft";
import PaginationArrowRoRight from "../../../assets/icons/PaginationArrowRoRight";

const CustomPagination: FC<PropsWithChildren<any>> = ({
                            total = 100,
                            limit,
                            page = 10,
                            changePage
                          }) => {

  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div className="pagination-to-left">
          <PaginationArrowRoLeft />
        </div>
      );
    }
    if (type === 'next') {
      return (
        <div className="pagination-to-right">
          <PaginationArrowRoRight />
        </div>
      );
    }
    return originalElement;
  };

  return (
    <Pagination
      className='pagination'
      // onChange={(page, pageSize): any => changePage(page)}
      defaultCurrent={1}
      current={page}
      pageSize={limit}
      total={total}
      showSizeChanger={false}
      itemRender={itemRender}
    />
  );
};

export default CustomPagination;
