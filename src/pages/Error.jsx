import React, { useEffect } from 'react';
import { Link } from 'react-router';
import error from '../assets/errorr-removebg-preview.png'

const Error = () => {
	useEffect(()=>{
			  document.title="GlobalBazaar | Error"
			  },[]);
    return (
        <div className='bg-amber-50 min-h-screen'>
             <div className='flex justify-center pt-16'>
				<img src={error} alt="" />
				
			 </div>
			 <div className='flex justify-center'>
			 <Link to={'/'} className='text-white px-4 py-2 rounded-lg shadow-md bg-amber-600 hover:bg-amber-800'>Back To Home</Link>
			 </div>
			 
		</div>
    );
};

export default Error;