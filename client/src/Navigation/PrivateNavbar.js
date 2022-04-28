import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import star from "../Components/images/logo.svg"


export const PrivateNavbar = () => {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-dark fixed-top">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-2">
                        <Link to="/" className="navbar-brand">

                            <img src={star} alt="star" width="30" height="24" />

                        </Link>
                    </div>
                    <div className="col-6">
                        <button className="navbar-toggler bg-primary btn-primary"
                            type="button" data-bs-toggle="collapse"
                            data-bs-target=".navbar-collapse"
                            aria-controls=".navbar-collapse"
                            aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i className="fas fa-bars"></i>
                        </button>
                        <div className="collapse navbar-collapse" id=".navbar-collapse">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item mb-2">
                                    <Link to="/" className="btn  btn-outline-warning me-2 nav-link active">
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/awards" className="btn  btn-outline-warning me-2 nav-link active">
                                        Awards
                                    </Link>
                                </li>
                                <li className="nav-item mb-2">
                                    <Link to="/about" className="btn  btn-outline-warning me-2 nav-link active">
                                        About
                                    </Link>
                                </li>
                               
                                    <div className="d-flex ">
                                        <li className=" nav-item mb-2  ">
                                            <Link to="/add-award" className="btn  btn-outline-warning me-2 nav-link active">
                                                +Awards
                                            </Link>
                                        </li>

                                        <li className="nav-item mb-2">
                                            <Link className="text-dark btn btn-primary me-2 nav-link active" to="/login" >
                                                Login
                                            </Link>
                                        </li>

                                    </div>
                                
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </nav>
    );
};
