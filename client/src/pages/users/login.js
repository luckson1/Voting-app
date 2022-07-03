import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { useFormik } from "formik";
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup';
import login from "../../Components/images/login.svg"
import { loginUserAction } from "../../redux/slices/users/UserSlices";

// import DisabledButton from "../../components/disableButton";

// validation
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
})

const Login = () => {
    // //history
    const navigate=useNavigate();


    // dispatch
    const dispatch = useDispatch()


    // get data from store

    const user = useSelector((state) => {
        return state?.users
    })
    const { userAppErr, userServerErr, userAuth}=user;
    // //form formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: values => {
            dispatch(loginUserAction(values))
        },

        validationSchema: formSchema,
    });

    // redirection
    useEffect(()=> {
    if (userAuth){
        return navigate('/dashboard')
    }
    }, [userAuth, navigate])

    return (
        <section className='Form my-4, mx-5 my-5'>
        <div className="container">
        <div className='row bg-light no-gutters'  style={{borderRadius:"30px"}}>
                <div className="col-lg-5 pt-2 px-2">
                    <img src={login} alt="" className="img-fluid" />
                </div>
                <div className='col-lg-7 px-5 pt-1'>
                <h3 className="fw-bold mb-2 py-5">Login to your account</h3>
                            {/* Display Err */}

                            {userAppErr || userServerErr ? (
                <div className="alert alert-danger" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-row">
                            <div className='col-lg-7'>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange("email")}
                                    onBlur={formik.handleBlur("email")}
                                    className="form-control mb-2 p-2"
                                    type="email"
                                    placeholder="E-mail address"
                                />
                            </div>
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.email && formik.errors.email}
                        </div>
                        <Link to="/recover" className="text-warning "> <p className="text-center mb-0 mx-0">Forgot Password?</p></Link>
                        <div className="form-row">
                            <div className='col-lg-7'>
                            
                                <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    className="form-control mb-2 p-2"
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                           
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.password && formik.errors.password}
                        </div>

                        <div className="form-row">
                            <div className='col-lg-7'>
                                <button
                                    type="submit"
                                    className=" btn-lg btn-primary py-2 w-100 my-4"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        <p> Don't have an account? <a href="/register">Register Here</a></p>
                    </form>
                </div>

            </div>

        </div >
    </section >
    );
};

export default Login;