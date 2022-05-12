import React, { useEffect, useState } from 'react';

import dashboard from '../Components/images/dashboard.png'
import vote1 from '../Components/images/vote4.jpg'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAwardsAction } from '../redux/slices/awards/AwardsSlices';
import LoadingComponent from '../Components/Loading';
import { PublicAwards } from '../Components/PublicAwards';








export const Home = () => {

  const [startDate, setStartDate] = useState(new Date())
  const handleChange = (date) => setStartDate(date)
  const [endDate, setEndDate] = useState(new Date())
  const handleChange2 = (date) => setEndDate(date)

  //navigate 
const dispatch = useDispatch()

//dispatch actions to fetch all awards
useEffect(() => {dispatch(fetchAwardsAction())}, [dispatch])
//get  state frin store 
    const allawards = useSelector(state => state?.awards);

  //obtain awards from state

    const {awardCreated, awardLoading, awardAppErr, awardServerErr, isawardDeleted}= allawards
    const awards=awardCreated?.awards

    

//filter the publised awards
    const publishedAwards=awards?.filter(award=> award.published===true)


  return (
    <>
      <div className='container-fluid my-5'>
        <div className='row'>
          <div className=" col col-4 card" style={{ width: '24rem', border: "none" }}>

            <div className="card-body">
              <h5 className="card-title fw-bold text-success">Best Voting Platform.
              </h5>
              <p className="card-text fw-bold">Use the best tools to analyze your data and make your vote a win for you. We have intuitive dashboard to manage all your awards.</p>
              <a href="/" className="btn btn-primary btn-outline-warning me-2"><h2 className="display-4>">Request Demo</h2></a>
            </div>
          </div>
          <div className=" col col-8 card " style={{  border: "none" }}>

            <div className="card-body">
              <img src={vote1} className="card-img-top" alt="..." />
            </div>
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
s
        </div>
      </div>
      <div className='container-fluid my-3 mx-3'>
        <div className='row ms-4'>
        {awardLoading ? (
                                        <h1><LoadingComponent /></h1>
                                    ) : awardServerErr || awardAppErr ? (
                                        <div>Err</div>
                                    ) : awards?.length<= 0 ? (
                                        <h1>No awards Found</h1>
                                    ) : (publishedAwards?.map(award => {
                                        
                                        return <PublicAwards award={award} key={award?._id }/>
                                    }))}
         
        </div>
      </div>
      <div className="tex-center">
        <h1 className="display-3 text-success text-center fw-bold">How It Works</h1>
        <p className="text-center fw-bold"> See how easy to run awards with our platform</p>
      </div>

      <div className='container-fluid my-5'>
        <div className='row'>
          <div className='col'>
            <div className="card text-center">
              <div className="card-header bg-info display-4">
                1
              </div>
              <div className="card-body">
                <h5>Create an Award</h5>
                <p className="card-text">You can receive voting in three ways that's voters voting using our platform with any kind of payment method, USSD and manual voting</p>

              </div>
            </div>
          </div>
          <div className='col '>
            <div className="card text-center">
              <div className="card-header bg-warning display-4">
                2
              </div>
              <div className="card-body">
                <h5>Receive Votes</h5>
                <p className="card-text">You can receive voting in three ways that's voters voting using our platform with any kind of payment method, USSD and manual voting</p>

              </div>
            </div>
          </div>
          <div className='col '>
            <div className="card text-center">
              <div className="card-header bg-success display-4">
                3
              </div>
              <div className="card-body">
                <h5>Get Paid</h5>
                <p className="card-text">Disbursement of money between the award creator and the platform is paperless that's everything is automatic. </p>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container-fluid my-5'>
        <div className='row'>
          <div className=" col card" style={{ width: "18rem", border: "none" }}>

            <div className="card-body">
              <h5 className="card-title fw-bold">Modern Dashboard
                To get manage your awards.
              </h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/" className="btn btn-primary "><h2 className="display-4>">Request Demo</h2></a>
            </div>
          </div>
          <div className=" col card " style={{ width: "18rem", border: "none" }}>

            <div className="card-body">
              <img src={dashboard} className="card-img-top" alt="..." />
            </div>
          </div>
        </div>
      </div>

    </>



  );
};
