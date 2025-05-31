import React from 'react';
import { Outlet } from 'react-router';
import Header from '../component/Header';
import Footer from '../component/Footer';

const MainLayout = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;