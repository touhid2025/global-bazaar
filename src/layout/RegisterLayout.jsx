import React from 'react';
import { Outlet } from 'react-router';

const RegisterLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default RegisterLayout;