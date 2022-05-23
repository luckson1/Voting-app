import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Sidebar } from './SideBar';
export const Layout1 = ({ children }) => {
  const userLogin = useSelector(state => state?.users?.userAuth);
  return (

    userLogin ? (<div className="row  mx-3 px-3">
      <div className=" col-2 bg-dark " >
        <Sidebar />
      </div>
      <div className="col-10 col-lg ">
        {children}
      </div>
    </div>) : (<Navigate to='/login' />)
  );
};
