import React, { useEffect} from 'react';

import dashboard from '../Components/images/dashboard.png'
import vote1 from '../Components/images/voting4.svg'
// import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"
import { useDispatch, useSelector } from 'react-redux';
import { fetchAwardsAction } from '../redux/slices/awards/AwardsSlices';
import LoadingComponent from '../Components/Loading';
import { PublicAwards } from '../Components/PublicAwards';








export const Home = () => {

  // const [startDate, setStartDate] = useState(new Date())
  // const handleChange = (date) => setStartDate(date)
  // const [endDate, setEndDate] = useState(new Date())
  // const handleChange2 = (date) => setEndDate(date)

  //dispatch
  const dispatch = useDispatch()

  //dispatch actions to fetch all awards
  useEffect(() => { dispatch(fetchAwardsAction()) }, [dispatch])
  //get  state frin store 
  const allawards = useSelector(state => state?.awards);

  //obtain awards from state

  const { awardCreated, awardLoading, awardAppErr, awardServerErr} = allawards
  const awards = awardCreated?.awards



  //filter the publised awards
  const publishedAwards = awards?.filter(award => award.published === true)


  return (
    <>
      <div className='container-fluid my-2 mx-5 '>
        <div className='row  no-gutters'  >
        <div className="col-md-7 pt-2 px-2">
                    <img src={vote1} alt="" className="img-fluid" />
                </div>
          <div className="col-md-5 py-3 ps-0  my-3 pe-5" >
            <h5 className="fw-bold text-success">Best Voting Platform.
            </h5>
            <p className="fw-bold">Use the best tools to analyze your data and make your vote a win for you.
              We have intuitive dashboard to manage all your awards.</p>
            <a href="/" className="btn btn-primary btn-outline-warning me-2"><h2 className="display-4>">Request Demo</h2></a>
          </div>
         
        </div>
      </div>
      <div className='container-fluid my-5' >
        <div className='row'>
          <div className='col  justify-content-center' >
            <h1 className="display-5 text-center text-primary fw-bold">Latest Awards</h1>
            <p className="h6 text-center">These are the latest awards that have been added. You can find past, ongoing and upcoming awards here, by using the filtering options below.</p>

          </div>

        </div>
      </div>
      {/* <div className="container-fluid my-5 mx-5">
        <div className='row'>
          <div className="col-3">
            <label htmlFor="datepicker" className="form-label fw-bold text-secondary ">Select start-date</label>
            <DatePicker
              className='datepicker'
              placeholder="start-date"
              selected={startDate}
              onChange={handleChange}
               />
          </div>
          <div className="col-3">
            <label htmlFor="datepicker" className="form-label fw-bold text-secondary">Select end-date</label>
            <DatePicker
              className='datepicker'
              selected={endDate}
              onChange={handleChange2}
               />
          </div>
          
        </div>
      </div> */}
      <div className='container-fluid my-3 mx-3'>
        <div className='row ms-4'>
          {awardLoading ? (
            <h1><LoadingComponent /></h1>
          ) : awardServerErr || awardAppErr ? (
            <div>Err</div>
          ) : awards?.length <= 0 ? (
            <h1>No awards Found</h1>
          ) : (publishedAwards?.map(award => {

            return <PublicAwards award={award} key={award?._id} />
          }))}

        </div>
      </div>
      <div className="tex-center my-3 ms-4">
        <h1 className="display-5 text-success text-center fw-bold">How It Works</h1>
        <p className="text-center fw-bold"> See how easy to run awards with our platform</p>
      </div>
      <div className='container-fluid my-5 ms-3'>
        <div className='row' style={{borderRadius: "20px"}}>
          <div className=" col-sm card" style={{ width: "100%", border: "none" , borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}>

            <div className="card-body" >
              <h5 className="card-title fw-bold">Modern Dashboard
                To get manage your awards.
              </h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="/" className="btn btn-primary "><h2 className="display-4>">Request Demo</h2></a>
            </div>
          </div>
          <div className=" col-sm card " style={{ width: "100%", border: "none" , borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px"}}>

            <div className="card-body">
              <img src={dashboard} className="card-img-top" alt="..." />
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid my-5'>
        <div className='row'>
          <div className='col-sm mb-3 mx-3' >
            <div className="card text-center" style={{ height: "18rem" , border: "1px solid black" ,borderRadius: "20px"}}>
              <div className="card-header bg-info display-4" style= {{borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}>
                1
              </div>
              <div className="card-body">
                <h6>Create an Award</h6>
                <p className="card-text">Easily create an award and its categories in just 2 steps</p>

              </div>
            </div>
          </div>
          <div className='col-sm mb-3 ms-3'>
            <div className="card text-center" style={{ height: "18rem" , border: "1px solid black" ,borderRadius: "20px"}}>
              <div className="card-header bg-warning display-4 " style= {{borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}>
                2
              </div>
              <div className="card-body">
                <h6>Contestants to apply</h6>
                <p className="card-text">Request suitable contestants to apply. hen Approve or reject contestants</p>

              </div>
            </div>
          </div>
          <div className='col-sm mb-3 ms-3' >
            <div className="card text-center" style={{ height: "18rem", border: "1px solid black" ,borderRadius: "20px"}}>
              <div className="card-header bg-success display-4" style= {{borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}>
                3
              </div>
              <div className="card-body">
                <h6>Voting</h6>
                <p className="card-text">Approved contestants easily receive votes from their supporters </p>

              </div>
            </div>
          </div>
        </div>
      </div>

     

    </>



  );
};
