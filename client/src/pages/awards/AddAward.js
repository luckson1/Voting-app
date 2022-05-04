import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import {createAwardAction} from "../../redux/slices/awards/AwardsSlices";


// validation
const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    image: Yup.string().required("image is required"),


})
export const AddAward = () => {


    // dispatch
    const dispatch = useDispatch()



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

    const { isawardCreated, awardLoading, awardCreated } = award
    
    //navigation and history
    const navigate = useNavigate()
    //dispatch
    useEffect(() => {
        if (isawardCreated) navigate('/all-awards')
    }, [isawardCreated, dispatch, navigate])

    return (
        <section className="py-5 px-5 bg-success  vh-100">
            <div className='container-fluid mt-5 text-center'>
                <div className='row'>
                    <div className="col-sm-4 mx-auto" >
                        <div className='card ' style={{ width: "24rem" }}>
                            <div className="my-3 mx-3">
                                <h1 className="text-center text-primary fw-bold">Create Award</h1>
                                <p className=" text-center text-success fw-bold">After creating an Award, you need to create its categories</p>

                            </div>
                            <form className="mb-3 mx-3"
                                onSubmit={formik.handleSubmit}
                                encType="multipart/form-data">
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Award Title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange("title")}
                                        onBlur={formik.handleBlur("title")} />
                                </div>
                                <div className="mb-3 input-group input-group-lg " style={{ height: '5rem' }}>
                                    <label htmlFor="exampleInputPassword1" className="form-label"></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Award Description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange("description")}
                                        onBlur={formik.handleBlur("description")} />
                                </div>
                                <div className="input-group mb-2">
                                    <label
                                        className="input-group-text"
                                        htmlFor="inputGroupFile02">
                                        image
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
                                        id="inputGroupFile02"
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">Create Award</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
