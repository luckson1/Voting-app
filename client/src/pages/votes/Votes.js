import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { createVoteAction } from "../../redux/slices/Votes/VotesSlices";
import voting from "../../Components/images/voting.svg"
import { fetchawardCategorysAction } from "../../redux/slices/AwardCategories/AwardCategorySlices";
import { PublicContestants } from "../../Components/PublicContestants";
export const Votes = () => {
    // validation
    const formSchema = Yup.object({
        email: Yup.string().required("Email is required"),
        contestantVotingFor: Yup.string().required("contestant is required")
    })

    // force navigation to another url 
    const navigate = useNavigate()

    // //get location data
    const location = useLocation()
    const category = location?.state
   
  



    // dispatch
    const dispatch = useDispatch()

    // get state of all Categories 
    //dispatch actions to fetch all awards
    useEffect(() => { dispatch(fetchawardCategorysAction(category)) }, [dispatch, category])
    // get data from store
    const data = useSelector(state => state?.categories)


    const contestants = useSelector((state) => {
        return state?.categories?.awardCategoryCreated?.awardCategory?.contestants
    })
// get approved contestants data
    const approvedContestants = contestants?.filter(contestant => contestant?.status === "Approved")

    // get loading and rejection state of loading categories
    const { awardCategoryAppErr, awardCategoryLoading, awardCategoryServerErr } = data;
    // //form formik
    const formik = useFormik({
        initialValues: {
            awardCategory: category?.id,
            email: "",
            contestantVotingFor: "",
            
            
        },
        onSubmit: values => {

            dispatch(createVoteAction(values))
        },

        validationSchema: formSchema,
    });

const vote=useSelector(state=>state?.votes)

const {voteIsRegistered}=vote
    // redirection
    useEffect(() => {
        if (voteIsRegistered) {
            return navigate('/vote-success')
        }
    }, [voteIsRegistered, navigate])


    return (<section className='Form my-4, mx-5 my-0'>
        <div className="container">
            <div className='row bg- no-gutters' style={{ borderRadius: "30px" }}>
                <div className="col-lg-5 pt-2 px-2 ">
                    <img src={voting} alt="" className="img-fluid" />
                </div>
                <div className='col-lg-7 px-5 pt-0 mt-0'>
                    <h3 className="fw-bold mb-2 py-2">Vote your Favourite </h3>
                    {/* Display Err */}

                    {awardCategoryAppErr || awardCategoryServerErr ? (
                        <div className="alert alert-danger" role="alert">
                            {awardCategoryServerErr} {awardCategoryAppErr}
                        </div>
                    ) : null}
                    <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                        <div className="row">
                            <div className='col-lg-7'>
                                <input
                                name="email"
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
                                <div className="mb-3">
                                    <h6 className='fw-bold'>Select Contestant</h6>
                                </div>
                                {awardCategoryLoading ? (
                                    <h1>Loading....</h1>
                                ) : awardCategoryAppErr || awardCategoryServerErr ? (
                                    <div>Err</div>
                                ) : approvedContestants?.length <= 0 ? (
                                    <h1>No Contestants Found</h1>
                                ) : (approvedContestants?.map(contestant => {

                                    return <PublicContestants contestant={contestant} key={contestant?._id} formik={formik} />
                                }))}
                            </div>
                        </div>
                        <div className="row">
                            <div className='col-lg-7'>
                                <button
                                    type="submit"
                                    className="btn btn-primary py-2 w-100 my-4"
                                >
                                    Vote
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
