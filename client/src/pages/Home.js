import React from 'react';
import { Awards} from '../Components/Awards';
import dashboard from '../Components/images/dashboard.png'
import vote1 from '../Components/images/vote4.jpg'









export const Home = () => {


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
      <div>
        <Awards />
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
