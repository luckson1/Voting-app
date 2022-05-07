import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import star from "../Components/images/logo.svg"
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/users/UserSlices";


const PrivateNavbar = () => {

    // create instance of  useDispatch 
    const dispatch = useDispatch()

   
       return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <Container wrapper > */}
            <div className="container-fluid">
                {/* Toggle button  */}

                <button className="navbar-toggler bg-primary btn-primary"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse"
                    aria-controls=".navbar-collapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>

                {/* collapsible wrapper */}

                <div className="collapse navbar-collapse" id=".navbar-collapse">
                    {/* Navbar brand */}
                    <li className="nav-item mb-2">


                        <Link to="/" className="navbar-brand">

                            <img src={star} alt="star" width="30" height="24" loading="lazy" />

                        </Link>
                    </li>

                    {/* Left Links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">


                        <li className="nav-item mb-2">
                            <Link to="/" className=" nav-link">
                                Home
                            </Link>
                        </li>

                        <li className="nav-item mb-2">
                            <Link to="/dashboard" className=" nav-link active ">
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Right elements */}
                <div className="d-flex align-items-center ">
                   
                        <Link to="/add-award" className=" nav-link nav-item mb-2  btn-warning me-2">
                            +Awards
                        </Link>
                 

                    <div className="dropdown">
                        <a
                            className="dropdown-toggle d-flex align-items-center hidden-arrow"
                            href="/"
                            id="navbarDropdownMenuAvatar"
                            role="button"
                            data-mdb-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img
                                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                className="rounded-circle"
                                height="25"
                                alt="Black and White Portrait of a Man"
                                loading="lazy"
                            />
                        </a>
                        <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="navbarDropdownMenuAvatar"
                        >
                            <li>
                                <Link className="dropdown-item" to="/profile">My profile</Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/settings">Settings</Link>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={()=> { dispatch(logout())}} >Logout</button>
                            </li>
                        </ul>
                    </div>

                </div>







            </div>
        </nav>
    );
};


export default PrivateNavbar;