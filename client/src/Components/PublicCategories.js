import React from 'react';
import { useNavigate } from 'react-router-dom';
export const PublicCategories = ({categories, image}) => {

    // call navigate function to pass state 
    const navigate = useNavigate()

   

    return(
        <>

       

       
                <div className='col mx-auto px-2'>
                    <div className="card mx-2 my-2 " style={{ width: "18rem" }}>
                        <img src={image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{categories?.title}</h5>
                           
                        </div>
                       
                        <div className="card-body">                        
                        <button onClick={()=> navigate({pathname:"/register-contestant"}, {state:categories})} className="card-link btn-sm btn-success" ><i class="bi bi-clipboard-check fs-5"><span>Apply</span></i></button>
                        </div>
                    </div>
                </div>
                
                
          
    </>
    );
};
