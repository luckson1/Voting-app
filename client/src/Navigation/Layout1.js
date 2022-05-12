import React from 'react';
import { Sidebar } from './SideBar';
export const Layout1 = ({ children }) => {
  return (
    
   
      <div className="row  mx-3 px-3">
        <div className=" col-2 bg-dark " >
          <Sidebar />
        </div>
        <div className="col-10 col-lg ">
          {children}
        </div>
      </div>
   
  );
};
