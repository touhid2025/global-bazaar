import React, { useEffect } from 'react';

const Cart = () => {
    useEffect(()=>{
              document.title="GlobalBazaar | Cart"
              },[]);
    return (
        <div className='min-h-screen'>
            cart
        </div>
    );
};

export default Cart;