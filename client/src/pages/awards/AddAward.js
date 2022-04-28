import React from 'react';



export const AddAward = () => {
    return (
        <section className="py-5 px-5 bg-success  vh-100">
            <div className='container-fluid mt-5 text-center'>
                <div className='row'>
                    <div className="col-sm-4 mx-auto" >
                        <div className='card ' style={{ width: "18rem;" }}>
                            <div className="my-3 mx-3">
                                <h1 className="text-center text-primary fw-bold">Create Award</h1>
                                <p className=" text-center text-success fw-bold">After creating an Award, you need to create its categories</p>

                            </div>
                            <form className="mb-3 mx-3" >
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label"></label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Award Title" />
                                </div>
                                <div className="mb-3 input-group input-group-lg " style={{ height: '5rem' }}>
                                    <label htmlFor="exampleInputPassword1" className="form-label"></label>
                                    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Award Description" />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" for="inputGroupFile01">Cover Image</label>
                                    <input type="file" className="form-control" id="inputGroupFile01" />
                                </div>

                                <button type="submit" className="btn btn-primary">Create Award</button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
