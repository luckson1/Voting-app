// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { PublicCategories } from '../../Components/PublicCategories';
// import { fetchAwardsAction } from '../../redux/slices/awards/AwardsSlices';
export const AwardsDetails = () => {
const location=useLocation()
const award=location?.state
const image=award?.image 



    return (
       <>
        <div className='container-fluid my-5'>
            <div className='row mx-4'>
       <h1 className="text-center text-success"> {award?.title} Categories</h1>
    {award?.categories.length<= 0 ? (<h1>No Categories Found</h1>) : (award?.categories.map(category => {
                                        
                                        return <PublicCategories categories={category} key={category?._id} image={image}/>
                                    }))}
       </div>
       </div>
       </>);
};
