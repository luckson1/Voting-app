// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Categories } from '../../Components/Categories';
// import { fetchAwardsAction } from '../../redux/slices/awards/AwardsSlices';
export const AllCategories = () => {
const location=useLocation()
const award=location?.state
const image=award?.image
console.log(award?.categories)
//get dispatch
// const dispatch = useDispatch()

//dispatch action to fetch all categories 

// useEffect(() => {dispatch(fetchAwardsAction())}, [dispatch])


//grab state from store using useSelector 



    return (
       <>
    {award?.categories.length<= 0 ? (<h1>No Categories Found</h1>) : (award?.categories.map(category => {
                                        
                                        return <Categories categories={category} key={category?._id} image={image}/>
                                    }))}
       </>);
};
