import  React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Awards } from '../../Components/Awards';
import LoadingComponent from '../../Components/Loading';
import { fetchAwardsAction } from '../../redux/slices/awards/AwardsSlices';



export const AllWards = () => {
    const [startDate, setStartDate] = useState(new Date())
  const handleChange = (date) => setStartDate(date)
  const [endDate, setEndDate] = useState(new Date())
  const handleChange2 = (date) => setEndDate(date)

//dispatch needed to get change state 
const dispatch = useDispatch()

//dispatch actions to fetch all awards
useEffect(() => {dispatch(fetchAwardsAction())}, [dispatch])
//get  state frin store 
    const allawards = useSelector (state => state?.awards);

  //obtain awards from state

    const {awardCreated, awardLoading, awardAppErr, awardServerErr, isawardPublished, isawardDeleted}= allawards
    const awards=awardCreated?.awards
   // call useNavigate
   const navigate = useNavigate()
    
   useEffect(() => {
    if (isawardPublished) navigate('/published-awards')
}, [isawardPublished, dispatch, navigate])

useEffect(() => {
  if (isawardDeleted) navigate('/all-awards')
}, [isawardDeleted, dispatch, navigate])

    return(
        
        <div className="bg-light my-3" style={{ borderRadius: "30px" }}>
        
      <div className='container-fluid'>
        <div className='row'>
          <div className='col  justify-content-center'>
            <h1 className="display-5 text-center text-primary fw-bold">Latest Awards</h1>
            <p className="h6 text-center">These are the latest awards that have been added. You can find past, ongoing and upcoming awards here, by using the filtering options below.</p>

          </div>

        </div>
      </div>
      <div className="container-fluid my-5 mx-5">
        <div className='row'>
          <div className="col-3">
            <label htmlFor="datepicker" className="form-label fw-bold text-secondary ">Select start-date</label>
            <DatePicker
              className='datepicker'
              placeholder="start-date"
              selected={startDate}
              onChange={handleChange}
              minDate={new Date()} />



          </div>
          <div className="col-3">
            <label htmlFor="datepicker" className="form-label fw-bold text-secondary">Select end-date</label>
            <DatePicker
              className='datepicker'
              selected={endDate}
              onChange={handleChange2}
              minDate={new Date()} />



          </div>
         
        </div>
      </div>

      <div className='container-fluid my-5'>
        <div className='row'>
        {awardLoading ? (
                                        <h1><LoadingComponent /></h1>
                                    ) : awardServerErr || awardAppErr ? (
                                        <div>Err</div>
                                    ) : awards?.length<= 0 ? (
                                        <h1>No awards Found</h1>
                                    ) : (awards?.map(award => {
                                        
                                        return <Awards award={award} key={award?.categories?._id }/>
                                    }))}
         
        </div>
      </div>
      <div className="mb-5 mt-2 text-center display-3">
        <button type="button" className="btn btn-primary btn-lg btn-block">Load More Awards</button>
      </div>
        </div>
    );
};
