import { useFormik } from 'formik';
import { React, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { createawardCategoryAction } from '../../redux/slices/AwardCategories/AwardCategorySlices';
import addCategory from '../../Components/images/addCategory.svg';
// form validation using yup
const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    // startDate: Yup.date().required("start is required"),
    // endDate: Yup.date().required("endDate is required"),
    // optForNotification: Yup.string().required("endDate is required"),
});


export const AddCategory = () => {

    // access location data and state
    const location = useLocation()
    const mainAward = location?.state

    // call dispatch
    const dispatch = useDispatch()


    //use formik to handle form operations 
    const formik = useFormik({
        initialValues: {
            title: "",
            startDate: "",
            endDate: "",
            optForNotification: '',
            mainAward: mainAward?.id,
            user: mainAward?.user





        },
        onSubmit: values => {

            dispatch(createawardCategoryAction(values))
        },

        validationSchema: formSchema,


    });

// control state of data input 
const [startDate, setStartDate]=useState(new Date())
const [endDate, setEndDate]=useState(new Date())
    // get state from store
    const awardCategories = useSelector((state) => {
        return state?.categories

    });

    // add the created category to state 

    const { isawardCategoryCreated } = awardCategories
    //navigation and history
    const navigate = useNavigate()
    //dispatch
    useEffect(() => {
        if (isawardCategoryCreated) navigate({ pathname: '/categories' }, { state: mainAward })
    }, [isawardCategoryCreated, dispatch, navigate, mainAward])


    return (
        <section className='form my-4  my-0 mx-0'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='row bg- no-gutters bg-light' style={{ borderRadius: "30px" }}>
                    <div className="col-lg-5 pt-2 px-2 ">
                        <img src={addCategory} alt="" className="img-fluid" />
                    </div>
                        <div className='col-sm-7 px-5 pt-0 mt-0'>

                            <div className="my-3 mx-3">
                                <h1 className="text-center text-primary fw-bold">Create Award Category</h1>
                            </div>
                            <form className="mb-3 mx-3" onSubmit={formik.handleSubmit}>
                                <div className="form-row">
                                    <div className='col-lg-11'>
                                        <label htmlFor="exampleInputEmail1" className="form-label"></label>
                                        <input
                                            type="text"
                                            className="form-control mb-3"
                                            name='title'
                                            aria-describedby="emailHelp"
                                            placeholder="Category Title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange("title")}
                                            onBlur={formik.handleBlur("title")} />
                                    </div>
                                </div>




                                <div className="form-row ">
                                <div className="container-fluid mx-0 px-0">
                                    <div className='row'>
                                        <div className="col mb-3">
                                            <label htmlFor="datepicker" className="form-label fw-bold text-secondary ">Select start-date</label>
                                            <DatePicker
                                                className='datepicker'
                                                id="startDate"
                                                name='startDate'
                                                placeholder="start-date"
                                                selected={startDate}
                                                onChange={val => { formik.setFieldValue('startDate', val); setStartDate(val) }}
                                                
                                    
                                                onBlur={formik.handleBlur("startDate")} />



                                        </div>
                                        <div className="col mb-3">
                                            <label htmlFor="datepicker" className="form-label fw-bold text-secondary">Select end-date</label>
                                            <DatePicker
                                                className='datepicker'
                                                name='endDate'
                                                selected={endDate}
                                                onChange={val=> {formik.setFieldValue('endDate', val); setEndDate(val) }}
                                                
                                               
                                                onBlur={formik.handleBlur("endDate")} />



                                        </div>


                                    </div>
                                </div>


                                </div>


                                <div className="form-row">
                                    <div className='col-lg-9'>
                                        <h6 className='fw-bold'>Select Notification Type</h6>

                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input mb-3"
                                                type="radio"
                                                name="optForNotification"
                                                id="Email"
                                                value='Email'
                                                // value={formik.values.optForNotification}
                                                onChange={() => { formik.setFieldValue('optForNotification', "Email") }}
                                                onBlur={formik.handleBlur("optForNotification")} />
                                            <label className="form-check-label" htmlFor="Email">Email</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input mb-3"
                                                type="radio" name="optForNotification"
                                                id="Text"

                                                value='Text'
                                                onChange={() => { formik.setFieldValue('optForNotification', "Text") }}
                                                onBlur={formik.handleBlur("optForNotification")} />
                                            <label className="form-check-label" htmlFor="Text">SMS</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input mb-3"
                                                type="radio" name="optForNotification"
                                                id="inlineRadio2"

                                                onChange={() => { formik.setFieldValue('optForNotification', "None") }}
                                                onBlur={formik.handleBlur("optForNotification")} />
                                            <label className="form-check-label" htmlFor="inlineRadio2">Never Mind</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className='col-lg-9'>
                                        <button type="submit" className="btn btn-primary">Create Award</button>
                                    </div>
                                    </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
