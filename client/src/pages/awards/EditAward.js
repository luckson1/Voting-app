import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { editAwardsAction} from "../../redux/slices/awards/AwardsSlices";



// form validation using yup
const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    // image: Yup.string().required("image is required"),


})
export const EditAward = () => {


    // dispatch
    const dispatch = useDispatch()
//get location state date sent from the awards page
const location=useLocation()
const state=location?.state


//use formik to handle form operations 
    const formik = useFormik({
        initialValues: {
            title: state?.title,
            description: state?.description,
            id: state?.id



        },
        onSubmit: values => {
            dispatch(editAwardsAction(values))
        },

        validationSchema: formSchema,


    });

    // get data from store

    const award = useSelector((state) => {
        return state?.awards

    });

    const { isawardUpdated} = award
    
    //navigation and history
    const navigate = useNavigate()
    //dispatch
    useEffect(() => {
        if (isawardUpdated) navigate('/all-awards')
    }, [isawardUpdated, dispatch, navigate])

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
                                

                                <button type="submit" className="btn btn-primary">Update Award</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
