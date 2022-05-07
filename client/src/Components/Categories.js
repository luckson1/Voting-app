import React from 'react';
export const Categories = ({categories, image}) => {
    
    return(
        <>

       

        <div className='container-fluid my-5'>
            <div className='row'>
                <div className='col'>
                    <div className="card" style={{ width: "18rem" }}>
                        <img src={image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{categories?.title}</h5>
                           
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">An item</li>
                            <li className="list-group-item">A second item</li>
                            <li className="list-group-item">A third item</li>
                        </ul>
                        <div className="card-body">
                            <a href="/" className="card-link">Card link</a>
                            <a href="/" className="card-link">Another link</a>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    </>
    );
};
