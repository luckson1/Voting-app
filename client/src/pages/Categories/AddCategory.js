import { useFormik } from 'formik';
import { React, useEffect } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { createawardCategoryAction } from '../../redux/slices/AwardCategories/AwardCategorySlices';

// form validation using yup
const formSchema = Yup.object({
    title: Yup.string().required("title is required"),
    // startDate: Yup.date().required("start is required"),
    // endDate: Yup.date().required("endDate is required"),
    // optForNotification: Yup.string().required("endDate is required"),
});


export const AddCategory = () => {

  // access location data and state
  const location=useLocation()
 const mainAward=location?.state

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
        if (isawardCategoryCreated) navigate({pathname:'/categories'}, {state: mainAward})
    }, [isawardCategoryCreated, dispatch, navigate, mainAward])


    return (
        <section className="py-5 px-5 bg-light  vh-100">
            <div className='container-fluid mt-5 text-center'>
                <div className='row'>
                    <div className="col mx-auto " >
                        <div className='card w-75 ' >
                            <div className="my-3 mx-3">
                                <h2 className="text-center text-primary fw-bold">Create Award Category</h2>
                            </div>
                            <form className="mb-3 mx-3" onSubmit={formik.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name='title'
                                        aria-describedby="emailHelp"
                                        placeholder="Category Title"
                                        value={formik.values.title}
                                        onChange={formik.handleChange("title")}
                                        onBlur={formik.handleBlur("title")} />
                                </div>



                                <div className="container-fluid ">
                                    <div className='row'>
                                        <div className="col">
                                            <label htmlFor="datepicker" className="form-label fw-bold text-secondary ">Select start-date</label>
                                            <DatePicker
                                                className='datepicker'
                                                id="startDate"
                                                name='startDate'
                                                placeholder="start-date"
                                                selected={formik.value}
                                                onChange={val=> {formik.setFieldValue('startDate', val)}}
                                                minDate={new Date()}
                                    
                                                onBlur={formik.handleBlur("startDate")} />



                                        </div>
                                        <div className="col">
                                            <label htmlFor="datepicker" className="form-label fw-bold text-secondary">Select end-date</label>
                                            <DatePicker
                                                className='datepicker'
                                                name='endDate'
                                                selected={formik.value}
                                                onChange={val=> {formik.setFieldValue('endDate', val)}}
                                                minDate={new Date()}
                                               
                                                onBlur={formik.handleBlur("endDate")} />



                                        </div>


                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h6 className='fw-bold'>Select Notification Type</h6>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="optForNotification"
                                        id="Email"
                                        value='Email'
                                        // value={formik.values.optForNotification}
                                        onChange={ ()=> {formik.setFieldValue('optForNotification', "Email")}}
                                        onBlur={formik.handleBlur("optForNotification")} />
                                    <label className="form-check-label" htmlFor="Email">Email</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio" name="optForNotification"
                                        id="Text"
                                        
                                        value='Text'
                                        onChange={()=> {formik.setFieldValue('optForNotification', "Text")}}
                                        onBlur={formik.handleBlur("optForNotification")} />
                                    <label className="form-check-label" htmlFor="Text">SMS</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio" name="optForNotification"
                                        id="inlineRadio2"
                                        
                                        onChange={()=> {formik.setFieldValue('optForNotification', "None")}}
                                        onBlur={formik.handleBlur("optForNotification")} />
                                    <label className="form-check-label" htmlFor="inlineRadio2">Never Mind</label>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary">Create Award</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
