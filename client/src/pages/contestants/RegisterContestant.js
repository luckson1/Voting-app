import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import contestant from "../../Components/images/contestant.svg"
import { registerContestantAction } from "../../redux/slices/contestants/ContestantsSlices";



// validation
const formSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    country: Yup.string().required("country is required"),
    firstname: Yup.string().required("firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    bio: Yup.string().required("bio is required"),
    gender: Yup.string().required("gender is required"),
    phoneNumber: Yup.string().required("phoneNumber is required"),
    image: Yup.string().required("image is required"),
    reasons: Yup.string().required("reasons is required"),

})

const RegisterContestant = () => {
    //history
    const navigate = useNavigate();

    // get location state passed to component

    const location = useLocation()
    const category = location?.state

    // dispatch
    const dispatch = useDispatch()


    // get data from store

    const contestants = useSelector((state) => {
        return state?.contestants
    })
    const { contestantAppErr, contestantServerErr, ContestantIsRegistered } = contestants;
    // //form formik
    const formik = useFormik({
        initialValues: {
            email: "",
            firstname: "",
            lastname: "",
            country: "",
            phoneNumber: "",
            image: "",
            gender: "",
            bio: "",
            reasons: "",
            companyApplyTo: category?.user,
            awardCategory: category?.id,
            mainAward: category?.mainAward





        },
        onSubmit: values => {
            dispatch(registerContestantAction(values))
        },

        validationSchema: formSchema,
    });

    // naviage to new page after redering 
    useEffect(() => {
        if (ContestantIsRegistered) {
            return navigate('/contestant-success')
        }
    }, [ContestantIsRegistered, navigate])

    return (
        <section className='Form my-4, mx-5 my-0 '>
            <div className="container">
                <div className='row bg- no-gutters' style={{ borderRadius: "30px" }}>
                    <div className="col-lg-5 pt-2 px-2 ">
                        <img src={contestant} alt="" className="img-fluid" />
                    </div>
                    <div className='col-lg-7 px-5 pt-0 mt-0'>
                        <h3 className="fw-bold mb-2 py-2">Apply to Contest the Award</h3>
                        {/* Display Err */}

                        {contestantAppErr || contestantServerErr ? (
                            <div className="alert alert-danger" role="alert">
                                {contestantServerErr} {contestantAppErr}
                            </div>
                        ) : null}
                        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

                            <div className="row">
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
                            <div className="row">
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
                            <div className="row">
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
                                        value={formik.values.country}
                                        onChange={formik.handleChange("country")}
                                        onBlur={formik.handleBlur("country")}
                                        className="form-control mb-2 p-2"
                                        type="Text"
                                        placeholder="country"
                                    />
                                </div>
                            </div>
                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.country && formik.errors.country}
                            </div>
                            <div className="row">
                                <div className='col-lg-7'>
                                    <div className="mb-3">
                                        <h6 className='fw-bold'>Select Gender</h6>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            id="Male"
                                            value='Male'
                                            // value={formik.values.gender}
                                            onChange={() => { formik.setFieldValue('gender', "Male") }}
                                            onBlur={formik.handleBlur("gender")} />
                                        <label className="form-check-label" htmlFor="Male">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio" name="gender"
                                            id="Female"

                                            value='Female'
                                            onChange={() => { formik.setFieldValue('gender', "Female") }}
                                            onBlur={formik.handleBlur("gender")} />
                                        <label className="form-check-label" htmlFor="Female">Female</label>
                                    </div>
                                </div>
                            </div>
                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.gender && formik.errors.gender}
                            </div>

                            <div className="row">
                                <div className='col-lg-7'>

                                    <textarea
                                        value={formik.values.bio}
                                        onChange={formik.handleChange("bio")}
                                        onBlur={formik.handleBlur("bio")}
                                        className="form-control mb-2 p-2"
                                        type="Text"
                                        placeholder="bio"
                                    ></textarea>
                                </div>

                            </div>
                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.bio && formik.errors.bio}
                            </div>
                            <div className="row">
                                <div className='col-lg-7'>

                                    <textarea
                                        value={formik.values.reasons}
                                        onChange={formik.handleChange("reasons")}
                                        onBlur={formik.handleBlur("reasons")}
                                        className="form-control mb-2 p-2"
                                        type="Text"
                                        placeholder="reasons"
                                    ></textarea>
                                </div>

                            </div>
                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.reasons && formik.errors.reasons}
                            </div>
                            <div className="row">
                                <div className='col-lg-7'>

                                    <label
                                        className="input-group-text bg-info"
                                        htmlFor="image">
                                        Profile Pic
                                    </label>
                                    <input
                                        name="image"
                                        value={undefined}
                                        onChange={(e) =>
                                            formik.setFieldValue('image', e.currentTarget.files[0])
                                        }
                                        onBlur={formik.handleBlur("image")}
                                        className="form-control"
                                        type="file"
                                        placeholder="Profile Image"
                                        id="image"
                                    />
                                </div>
                            </div>
                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.image && formik.errors.image}
                            </div>
                            <div className="row">
                                <div className='col-lg-7'>
                                    <button
                                        type="submit"
                                        className="btn btn-primary py-2 w-100 my-4"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>

            </div >
        </section >
    );
};

export default RegisterContestant;