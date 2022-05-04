import React from "react";
import { useSelector } from "react-redux";
import PrivateNavbar from "./PrivateNavbar";
import PublicNavbar from "./PublicNavbar";

const Navbar = () => {
  const userLogin = useSelector(state => state?.users?.userAuth);
 
  return <>{userLogin ? <PrivateNavbar /> : <PublicNavbar />}</>;
};

export default Navbar;

