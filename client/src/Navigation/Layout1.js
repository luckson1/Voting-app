import React from 'react';
import { Sidebar } from './SideBar';
export const Layout1 = ({ children }) => {
  return (
    <div className="container">
      <div className="row">
        <div className=" col-2 sm-4" style= {{width: '9rem'}}>
          <Sidebar />
        </div>
        <div className="col-10 sm-8">
          {children}
        </div>
      </div>
    </div>
  );
};
