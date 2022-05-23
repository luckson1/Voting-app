import React from 'react';
import { Sidebar } from './SideBar';
export const Layout1 = ({children}) => {
    return(
        <div container>
        <div item md={4}>
          <Sidebar />
        </div>    
        <div item md={8}>
          {children}
        </div>     
      </div>
    );
};
