import React, { useEffect } from 'react';
import BannerSlider from '../component/BannerSlider';
import ProductCategories from '../component/ProductCategories';
import { useLoaderData } from 'react-router';
import Extra from '../component/Extra';
import Why from '../component/Why';

const Home = () => {
    useEffect(()=>{
              document.title="GlobalBazaar | Home"
              },[]);
    const products = useLoaderData();
    return (
        <div className='min-h-screen'>
            <BannerSlider></BannerSlider>
            <ProductCategories></ProductCategories>
            <Extra products={products}></Extra>
            <Why></Why>
        </div>
    );
};

export default Home;