import  React, {useState} from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"


export const AllWards = () => {
    const [startDate, setStartDate] = useState(new Date())
  const handleChange = (date) => setStartDate(date)
  const [endDate, setEndDate] = useState(new Date())
  const handleChange2 = (date) => setEndDate(date)
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
          <div className='col'>
            <div className="card" style={{ width: "18rem", border: "none" }}>
              <img src="https://picsum.photos/300/300?random=1" className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
          <div className='col '>
            <div className="card" style={{ width: "18rem", border: "none" }}>
              <img src="https://picsum.photos/id/237/200/200" className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
          <div className='col '>
            <div className="card" style={{ width: "18rem", border: "none" }}>
              <img src="https://picsum.photos/300/300?grayscale" className="card-img-top" alt="..." />
              <div className="card-body">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="/" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 mt-2 text-center display-3">
        <button type="button" className="btn btn-primary btn-lg btn-block">Load More Awards</button>
      </div>
        </>
    );
};
