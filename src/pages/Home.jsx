import React, { useEffect } from 'react';
import BannerSlider from '../component/BannerSlider';
import ProductCategories from '../component/ProductCategories';
import Why from '../component/Why';
import AnimatedStats from '../component/AnimatedStats';

const Home = () => {
    useEffect(()=>{
              document.title="GlobalBazaar | Home"
              },[]);
    return (
        <div className='min-h-screen'>
            <BannerSlider></BannerSlider>
            <ProductCategories></ProductCategories>
            <AnimatedStats></AnimatedStats>
            <Why></Why>
        </div>
    );
};

export default Home;