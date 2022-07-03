import React, { useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { useFormik } from "formik";
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup';
import login from "../../Components/images/login.svg"
import { registerUserAction } from "../../redux/slices/users/UserSlices";
// import { loginUserAction } from "../../redux/slices/users/userSlices";
// import DisabledButton from "../../components/disableButton";

// validation
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    company: Yup.string().required("company is required"),
    companyTitle: Yup.string().required("companyTitle is required"),
    phoneNumber: Yup.string().required("phoneNumber is required"),
    image: Yup.string().required("image is required"),

})

const Register = () => {
    //history
    const navigate=useNavigate();


    // dispatch
    const dispatch = useDispatch()


    // get data from store

    const user = useSelector((state) => {
        return state?.users
    })
    const { userAppErr, userServerErr, userLoading, isRegistered}=user;
    // //form formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            company: "",
            companyTitle: "",
            phoneNumber: "",
            image: ""


        },
        onSubmit: values => {
            dispatch(registerUserAction(values))
        },

        validationSchema: formSchema,
    });
    useEffect(() => {
        if (isRegistered) {
          return navigate('/login')
        }
      }, [isRegistered, navigate])

    return (
        <section className='Form my-4, mx-5 my-0'>
        <div className="container">
        <div className='row bg- no-gutters'  style={{borderRadius:"30px"}}>
                <div className="col-lg-5 pt-2 px-2 ">
                    <img src={login} alt="" className="img-fluid" />
                </div>
                <div className='col-lg-7 px-5 pt-0 mt-0'>
                <h3 className="fw-bold mb-2 py-2">Create your account</h3>
                            {/* Display Err */}

                            {userAppErr || userServerErr ? (
                <div className="alert alert-danger" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null}
                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        
                    <div className="form-row">
                            <div className='col-lg-7'>
                                <input
                                    value={formik.values.firstname}
                                    onChange={formik.handleChange("firstname")}
                                    onBlur={formik.handleBlur("firstname")}
                                    className="form-control mb-2 p-2"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.firstname && formik.errors.firstname}
                        </div>
                        <div className="form-row">
                            <div className='col-lg-7'>
                                <input
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange("lastname")}
                                    onBlur={formik.handleBlur("lastname")}
                                    className="form-control mb-2 p-2"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </div>
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.lastname && formik.errors.lastname}
                        </div>
                        <div className="form-row">
                            <div className='col-lg-7'>
                                <input
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange("phoneNumber")}
                                    onBlur={formik.handleBlur("phoneNumber")}
                                    className="form-control mb-2 p-2"
                                    type="text"
                                    placeholder="Phone Number"
                                />
                            </div>
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.phoneNumber && formik.errors.phoneNumber}
                        </div>
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
                        <div className="form-row">
                            <div className='col-lg-7'>
                                <input
                                    value={formik.values.company}
                                    onChange={formik.handleChange("company")}
                                    onBlur={formik.handleBlur("company")}
                                    className="form-control mb-2 p-2"
                                    type="Text"
                                    placeholder="company"
                                />
                            </div>
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.company && formik.errors.company}
                        </div>
                        <div className="form-row">
                            <div className='col-lg-7'>
                                <input
                                    value={formik.values.companyTitle}
                                    onChange={formik.handleChange("companyTitle")}
                                    onBlur={formik.handleBlur("companyTitle")}
                                    className="form-control mb-2 p-2"
                                    type="Text"
                                    placeholder="companyTitle"
                                />
                            </div>
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.companyTitle && formik.errors.companyTitle}
                        </div>
                        <div className="form-row">
                            <div className='col-lg-7'>
                                <input
                                    value={undefined}
                                    onChange={(e) =>
                                        formik.setFieldValue('image', e.currentTarget.files[0])
                                      }
                                    onBlur={formik.handleBlur("image")}
                                    className="form-control mb-2 p-2"
                                    type="file"
                                    placeholder="image"
                                />
                            </div>
                        </div>
                        {/* Err */}
                        <div className="text-danger mb-2">
                            {formik.touched.image && formik.errors.image}
                        </div>
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
                                    className="btn-lg btn-primary py-2 w-100 my-4"
                                >
                                   Register
                                </button>
                            </div>
                        </div>
                        <p> Have an account? <a href="/Login">Login Here</a></p>
                    </form>
                </div>

            </div>

        </div >
    </section >
    );
};

export default Register;