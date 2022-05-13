import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  deleteAwardsAction, publishAwardsAction } from "../redux/slices/awards/AwardsSlices";



export const Awards = (award) => {
  // get award data from the award docs name award
  const data = award?.award
  
  const image = data?.image
 

  // initiate dispatch to handle reducer
  const dispatch = useDispatch()

  // enable navigation and sharing of state to another component 

const navigate =useNavigate()
  return (

    <>





      <div className='col'>
        <div className="card" style={{ width: "18rem" }}>
          <div className="embed-responsive embed-responsive-16by9 " style={{ height: "10rem" }}>

            <img src={image} className="card-img-top embed-responsive-item mh-100" alt="..." />
          </div>
          <div className="card-body">
            <h4 className="card-title" >{data?.title}</h4>
            <h6 className="card-title  btn-link text-warning" type="button" onClick={() =>navigate({pathname: '/categories'}, {state: data})} ><i className="bi bi-folder-plus fs-5"> Browse  Categories</i></h6>
            <p className="card-text">{data?.description}</p>
          </div>

          <div className="card-body ">
            {data?.published===true? (<p  className=" text-success" style={{fontSize: " 0.7rem"}}>Published</p>): <button onClick={()=> { dispatch(publishAwardsAction(data))}} className="card-link btn-sm btn-primary" style={{fontSize: " 0.7rem"}} >Publish</button>}
            <button onClick={() =>navigate({pathname: '/add-category'}, {state: data})} className="card-link btn-sm  btn-primary" ><i className="bi bi-plus-circle "> Categories</i></button>
            <button onClick={()=> navigate({pathname: "/edit-award"}, {state:data}) } className="card-link btn-sm btn-warning" ><i className="bi bi-pencil-square"></i></button>
            <button onClick={()=> dispatch(deleteAwardsAction(data))} className="card-link btn-sm btn-danger" ><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>



    </>
  );
};
// export default Awards;

