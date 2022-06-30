import React from 'react';
import { useNavigate } from 'react-router-dom';
export const PublicCategories = ({category, image}) => {

    // call navigate function to pass state 
    const navigate = useNavigate()



   

    return(
        <>

       

       
                <div className='col mx-auto px-2'>
                    <div className="card mx-2 my-2 " style={{ width: "18rem", height: "260px", borderRadius: "20px", backgroundImage: `url(${image})`, backgroundSize: "cover"}}>
                        
                        <div className="card-body">
                            <h5 className="card-title">{category?.title}</h5>
                           
                        </div>
                       
                        <div className="card-body">                        
                        <button onClick={()=> navigate({pathname:"/register-contestant"}, {state:category})} className="card-link btn-sm btn-success me-4 ms-2" ><i className="bi bi-clipboard-check fs-7"><span> Contest</span></i></button>
                        <button onClick={()=> navigate({pathname:"/vote-contestant"}, {state:category})} className="card-link btn-sm btn-warning ms-5" ><i className="bi bi-check2-circle fs-7"><span> Vote</span></i></button>
                        </div>
                    </div>
                </div>
                
                
          
    </>
    );
};
