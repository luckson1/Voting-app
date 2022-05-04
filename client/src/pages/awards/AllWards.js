import  React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { Awards } from '../../Components/Awards';
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

    const {awardCreated, awardLoading, awardAppErr, awardServerErr}= allawards
    const awards=awardCreated?.awards
    console.log(allawards)
    


    return(
        
        <>
        
      <div className='container-fluid  bg-info-gradient'>
        <div className='row'>
          <div className='col  justify-content-center'>
            <h1 className="display-2 text-center text-primary fw-bold">Latest Awards</h1>
            <p className="h6 text-center">These are the latest awards that have been added. You can find past, ongoing and upcoming awards here, by using the filtering options below.</p>

          </div>

        </div>
      </div>
      <div className="container-fluid my-5 mx-5">
        <div className='row'>
          <div className="col">
            <label htmlFor="datepicker" className="form-label fw-bold text-secondary ">Select start-date</label>
            <DatePicker
              className='datepicker'
              placeholder="start-date"
              selected={startDate}
              onChange={handleChange}
              minDate={new Date()} />



          </div>
          <div className="col">
            <label htmlFor="datepicker" className="form-label fw-bold text-secondary">Select end-date</label>
            <DatePicker
              className='datepicker'
              selected={endDate}
              onChange={handleChange2}
              minDate={new Date()} />



          </div>
          <div className="col-4">
            <div className="dropdown">
              <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter by Award Category
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <button className="dropdown-item" type="button">Action</button>
                <button className="dropdown-item" type="button">Another action</button>
                <button className="dropdown-item" type="button">Something else here</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className='container-fluid my-5'>
        <div className='row'>
        {awardLoading ? (
                                        <h1>Loading</h1>
                                    ) : awardServerErr || awardAppErr ? (
                                        <div>Err</div>
                                    ) : awards?.length<= 0 ? (
                                        <h1>No awards Found</h1>
                                    ) : (awards?.map(award => {
                                        
                                        return <Awards item={award} key={award?._id} />
                                    }))}
         
        </div>
      </div>
      <div className="mb-5 mt-2 text-center display-3">
        <button type="button" className="btn btn-primary btn-lg btn-block">Load More Awards</button>
      </div>
        </>
    );
};
