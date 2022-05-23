import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAwardCategoryAction, publishawardCategorysAction } from '../redux/slices/AwardCategories/AwardCategorySlices';
export const Categories = ({categories, image}) => {

    // call navigate function to pass state 
    const navigate = useNavigate()

    // dispatch to dispatch publishing action 

    const dispatch = useDispatch()
    
    // get categories state frm store 
    const category = useSelector(state=> state?.categories)
    
const {isawardCategoryPublished, isawardCategoryDeleted}=category
    //dispatch
    useEffect(() => {
        if (isawardCategoryPublished) navigate({pathname:'/all-awards'})
    }, [isawardCategoryPublished, dispatch, navigate])
    useEffect(() => {
        if (isawardCategoryDeleted) navigate('/all-awards')
      }, [isawardCategoryDeleted, dispatch, navigate])
    return(
        <>

       

       
                <div className='col'>
                    <div className="card mx-2 my-2 " style={{ width: "18rem" }}>
                        <img src={image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{categories?.title}</h5>
                           
                        </div>
                       
                        <div className="card-body">
                        {categories?.published===true?
                         (<p  className=" text-success" style={{fontSize: " 0.7rem"}}>Published</p>)
                         : <button className="card-link btn-sm btn-primary" style={{fontSize: " 0.7rem"}} onClick={() => dispatch(publishawardCategorysAction(categories))}>Publish</button>}
                        <button  className="card-link btn-sm btn-warning" onClick={() =>navigate({pathname: '/edit-category'}, {state: categories})}><i class="bi bi-pencil-square"></i></button>
                        <button onClick={()=> dispatch(deleteAwardCategoryAction(categories))} className="card-link btn-sm btn-danger" ><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                </div>
                
                
          
    </>
    );
};
