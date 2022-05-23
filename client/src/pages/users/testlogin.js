import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { createVoteAction } from "../../redux/slices/Votes/VotesSlices";

export const Testlogin = () => {
    // validation
    const formSchema = Yup.object({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    // force navigation to another url 
    const navigate = useNavigate()

    // //get location data
// const location=useLocation()



    // dispatch
    const dispatch = useDispatch()


    // get data from store

    const user = useSelector((state) => {
        return state?.users
    })
    const { userAppErr, userServerErr, userAuth } = user;
    // //form formik
    const formik = useFormik({
        initialValues: {
            email: "",
            contestantVotingFor: ""
        },
        onSubmit: values => {
            dispatch(createVoteAction(values))
        },

        validationSchema: formSchema,
    });

    // redirection
    useEffect(() => {
        if (userAuth) {
            return navigate('/dashboard')
        }
    }, [userAuth, navigate])


    return (<section className='Form my-4, mx-5 my-0'>
        <div className="container">
        <div className='row bg- no-gutters'  style={{borderRadius:"30px"}}>
                
                <div className='col-lg px-5 pt-0 mt-0'>
                <h3 className="fw-bold mb-2 py-2">Create your account</h3>
                            {/* Display Err */}

                            {userAppErr || userServerErr ? (
                <div className="alert alert-danger" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null}
                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                                                                                                                   <div className="row">
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
                        <div className="row">
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
                            {formik.touched.companyTitle && formik.errors.companyTitle}
                        </div>
                        <div className="row">
                                <div className='col-lg-7'>
                                    <div className="mb-3">
                                        <h6 className='fw-bold'>Select Contestant</h6>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="contestant"
                                            id="Male"
                                            value='Male'
                                            // value={formik.values.contestant}
                                            onChange={() => { formik.setFieldValue('contestant', "Male") }}
                                            onBlur={formik.handleBlur("contestant")} />
                                        <label className="form-check-label" htmlFor="Male">Male</label>
                                    </div>
                         
                                </div>
                            </div>
                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.contestant && formik.errors.contestant}
                            </div>
                        <div className="row">
                            <div className='col-lg-7'>
                                <button
                                    type="submit"
                                    className="btn btn-primary py-2 w-100 my-4"
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
