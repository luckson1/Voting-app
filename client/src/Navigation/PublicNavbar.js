import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import star from "../Components/images/logo.svg"


const PublicNavbar = () => {
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
                            <Link to="/About" className=" nav-link active ">
                                About
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link to="/Awards" className=" nav-link active ">
                                Awards
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* Right elements */}
                <div className="d-flex align-items-center ">
                    <button className=" nav-item mb-2 btn btn-warning me-2 ">
                        <a href="/login" className=" nav-link">
                            Login
                        </a>
                    </button>

                    

                </div>







            </div>
        </nav>
    );
};


export default PublicNavbar; 