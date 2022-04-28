import { useState, React } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.min.css"




export const AddCategory = () => {

    const [startDate, setStartDate] = useState(null)
    const handleChange = (date) => setStartDate(date)
    const [endDate, setEndDate] = useState(null)
    const handleChange2 = (date) => setEndDate(date)
    return (
        <section className="py-5 px-5 bg-success  vh-100">
            <div className='container-fluid mt-5 text-center'>
                <div className='row'>
                    <div className="col-sm-4 mx-auto" >
                        <div className='card ' style={{ width: "24rem" }}>
                            <div className="my-3 mx-3">
                                <h2 className="text-center text-primary fw-bold">Create Award Category</h2>
                            </div>
                            <form className="mb-3 mx-3" >
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"></label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Category Title" />
                                </div>



                                <div className="container-fluid ">
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


                                    </div>
                                </div>

                                <div className="mb-3">
                                    <h6 className='fw-bold'>Select Notification Type</h6>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                    <label className="form-check-label" htmlFor="inlineRadio1">Email</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                    <label className="form-check-label" htmlFor="inlineRadio2">SMS</label>
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
