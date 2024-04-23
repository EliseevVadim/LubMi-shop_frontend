import React from 'react';
import Meta from "../seo/Meta";
import MainLayout from "../layouts/MainLayout";
import NotFoundContent from "../features/404/NotFoundContent";

const NotFound = () => {

    return (
        <Meta title={'404'}>
            <MainLayout>
               <NotFoundContent/>
            </MainLayout>
        </Meta>
    )
};

export default NotFound;
