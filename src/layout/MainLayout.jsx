import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Loader from '../component/Loader';

const MainLayout = () => {
    const {state} = useNavigation()
    return (
        <div className='bg-amber-50'>
            <Header></Header>
            {
                state == 'loading'? <Loader></Loader>:<Outlet></Outlet>
            }
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;