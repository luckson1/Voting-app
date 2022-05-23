import React from "react";
import { Link } from "react-router-dom";
// import { useDispatch , useSelector } from "react-redux";
import { useFormik } from "formik";
// import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup';
import login from "../../Components/images/login.svg"
// import { loginUserAction } from "../../redux/slices/users/userSlices";
// import DisabledButton from "../../components/disableButton";

// validation
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required")
})

const UpdatePassword = () => {
    // //history
    // const navigate=useNavigate();


    // dispatch
    // const dispatch = useDispatch()


    // get data from store

    // const user = useSelector((state) => {
    //     return state?.users
    // })
    // const { userAppErr, userServerErr, userLoading, userAuth}=user;
    // //form formik
    const formik = useFormik({
        initialValues: {
            password: "",
            RepeatPassword: "",
        },
        onSubmit: values => {
            
        },

        validationSchema: formSchema,
    });

    // redirection
    // useEffect(()=> {
    // if (userAuth){
    //     return navigate('/profile')
    // }
    // }, [userAuth])

    return (
        <section
            style={{ height: "100vh" }}
            className=" py-5  overflow-hidden bg-info container-fluid"
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
                           
                            <h3 className="fw-bold mb-5 text-center">Login to your account</h3>
                            {/* Display Err */}

                            {/* {userAppErr || userServerErr ? (
                <div className="alert alert-danger" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null} */}
                            <form onSubmit={formik.handleSubmit}>
                            <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    className="form-control mb-2"
                                    type="password"
                                    placeholder="Password"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.password && formik.errors.password}
                                </div>
                                <input
                                    value={formik.values.password}
                                    onChange={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    className="form-control mb-2"
                                    type="password"
                                    placeholder="Password"
                                />
                                {/* Err */}
                                <div className="text-danger mb-2">
                                    {formik.touched.password && formik.errors.password}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary py-2 w-100 mb-4"
                                    >
                                        Update
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpdatePassword;