import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { groceryContext } from '../Layout/Layout';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const location = useLocation();
    const { user } = useSelector((store) => store.User);
    return (
        user ?
            <Outlet />
            : <Navigate
                to={'/login'}
                state={{ from: location }} />
    );
};

export default ProtectedRoute;