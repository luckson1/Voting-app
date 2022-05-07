import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch , useSelector } from "react-redux";
import { useFormik } from "formik";
// import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup';
import login from "../../Components/images/login.svg"
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction } from "../../redux/slices/users/UserSlices";
// import { loginUserAction } from "../../redux/slices/users/userSlices";
// import DisabledButton from "../../components/disableButton";

// validation
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    company: Yup.string().required("company is required"),
    companyTitle: Yup.string().required("companyTitle is required"),
    phoneNumber: Yup.string().required("phoneNumber is required"),
    image: Yup.string().required("image is required"),

})

const UpdateProfile = () => {
    // //history and navigation
    const navigate =useNavigate();


    // dispatch instance 
    const dispatch = useDispatch()


    
    
//get location data
    const location=useLocation()
    const user=location?.state
    

    //formik t handle our form inputs and operations 
    const formik = useFormik({
        initialValues: {
            email: user?.email,
            firstname: user?.firstname,
            lastname : user?.lastname,
            company : user?.company,
            companyTitle : user?.companyTitle,
            phoneNumber: user?.phoneNumber,
            
    
        },
        onSubmit: values => {
            dispatch(updateProfileAction(values))
        },

        validationSchema: formSchema,
    });


    // get state from store
    const updatedProfile= useSelector ((state) => {return state?.users})
    const{ isProfileUpdated}=updatedProfile
    console.log(updatedProfile)
    // redirection
    useEffect (() => {
        if (isProfileUpdated) navigate("/profile")
    }, [isProfileUpdated, dispatch, navigate])

    return (
        <section
            style={{ height: "100vh" }}
            className="position-relative py-5  overflow-hidden bg-info"
        >
            <div className="d-none d-md-block position-absolute top-0 start-0 bg-light w-75 h-100"></div>
            <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
            <div className="container position-relative mx-auto">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5 mb-5">
                        <div>
                            <img src={login} alt="" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 ms-auto">
                        <div className="p-5 bg-light rounded ">
                            <div id="emailHelp" className="form-text text-center mb-2 text-dark">
                                <li><Link className=" btn btn-warning  py-1 w-100 mb-2" type="button" to="/register">Have an Account? Login</Link></li>
                            </div>

                            <h3 className="fw-bold mb-2 text-center">Create your account</h3>
                            {/* Display Err */}

                            {/* {userAppErr || userServerErr ? (
                <div className="alert alert-danger" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null} */}
                            <form onSubmit={formik.handleSubmit}>
                                <input
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="firstname"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.firstname && formik.errors.firstname}
                                </div>
                                <input
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="lastname"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.lastname && formik.errors.lastname}
                                </div>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    className="form-control mb-2"
                                    type="email"
                                    placeholder="E-mail address"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                                <input
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange("phoneNumber")}
                                    onBlur={formik.handleBlur("phoneNumber")}
                                    className="form-control mb-2"
                                    type="string"
                                    placeholder="phoneNumber"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.phoneNumber && formik.errors.phoneNumber}
                                </div>

                                <input
                                    value={formik.values.company}
                                    onChange={formik.handleChange("company")}
                                    onBlur={formik.handleBlur("company")}
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="company"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.company && formik.errors.company}
                                </div>
                                <input
                                    value={formik.values.companyTitle}
                                    onChange={formik.handleChange("companyTitle")}
                                    onBlur={formik.handleBlur("companyTitle")}
                                    className="form-control mb-2"
                                    type="text"
                                    placeholder="companyTitle"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.companyTitle && formik.errors.companyTitle}
                                </div>
                                                        

                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary py-2 w-100 mb-4"
                                    >
                                        Update
                                    </button>
                                </div>
                                <div id="emailHelp" className="form-text text-center mb-5 text-dark"><Link to="/recover" className="text-dark fw-bold"> Forgot Your Password?</Link>
                                    <li><Link className=" btn btn-warning  py-1 w-100 mb-2" type="button" to="/register">New User? Register</Link></li>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdateProfile;