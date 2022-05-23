import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { createAwardAction } from "../../redux/slices/awards/AwardsSlices";


// form validation using yup
const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    image: Yup.string().required("image is required"),


})
export const AddAward = () => {


    // dispatch
    const dispatch = useDispatch()


    //use formik to handle form operations 
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            image: "",



        },
        onSubmit: values => {
            dispatch(createAwardAction(values))
        },

        validationSchema: formSchema,


    });

    // get data from store

    const award = useSelector((state) => {
        return state?.awards

    });

    const { isawardCreated} = award

    //navigation and history
    const navigate = useNavigate()
    //dispatch
    useEffect(() => {
        if (isawardCreated) navigate('/all-awards')
    }, [isawardCreated, dispatch, navigate])

    return (
        <section className='form my-4  my-0 mx-0'>
            <div className='container-fluid'>
                <div className='row bg- no-gutters bg-light' style={{ borderRadius: "30px" }}>
                    <div className='col-sm-9 px-5 pt-0 mt-0 text-center'>

                        <div className="my-3 mx-3">
                            <h1 className="text-center text-primary fw-bold">Create Award</h1>
                            <p className=" text-center text-success fw-bold">After creating an Award, you need to create its categories</p>

                        </div>
                        <form className="mb-3 mx-3"
                            onSubmit={formik.handleSubmit}
                            encType="multipart/form-data">

                            <div className="form-row">
                                <div className='col-lg-9'>
                                    <label htmlFor="title" className="form-label text-center">Award Title</label>
                                    <input
                                        type="text"
                                        className="form-control mb-3"
                                        id="title"
                                        aria-describedby="emailHelp"
                                        placeholder="Title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange("title")}
                                        onBlur={formik.handleBlur("title")} />
                                </div>
                            </div>
                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.title && formik.errors.title}
                            </div>

                            <div className="form-row">
                                <div className='col-lg-9'>
                                    <label htmlFor="description" className="form-label">Award Description</label>
                                    <textarea
                                        type="Text"
                                        className="form-control mb-3"
                                        id="description"
                                        style={{ height: "6rem" }}
                                        placeholder="Describe Award Here...."
                                        value={formik.values.description}
                                        onChange={formik.handleChange("description")}
                                        onBlur={formik.handleBlur("description")} />
                                </div>
                            </div>

                            {/* Err */}
                            <div className="text-danger mb-2">
                                {formik.touched.description && formik.errors.description}
                            </div>

                            <div className="form-row">
                                <div className='col-lg-9'>
                                    <label
                                        className="form-label"
                                        htmlFor="image">
                                        Award Cover
                                    </label>
                                    <input
                                        name="image"
                                        value={undefined}
                                        onChange={(e) =>
                                            formik.setFieldValue('image', e.currentTarget.files[0])
                                        }
                                        onBlur={formik.handleBlur("image")}
                                        className="form-control mb-3"
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

                            <div className="form-row">
                                <div className='col-lg-9'>
                                    <button type="submit" className="btn btn-primary mb-3">Create Award</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};
