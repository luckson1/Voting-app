import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeAwardsAction, publishAwardsAction } from "../redux/slices/awards/AwardsSlices";



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
            <h5 className="card-title  btn-link" type="button" onClick={() =>navigate({pathname: '/categories'}, {state: data})} >{data?.title}</h5>
            <p className="card-text">{data?.description}</p>
          </div>

          <div className="card-body ">
            {data?.published===true? (<p  className=" text-success" style={{fontSize: " 0.7rem"}}>Published</p>): <button onClick={()=> { dispatch(publishAwardsAction(data)).then((this).prop("disabled",true))}} className="card-link btn-sm btn-primary" style={{fontSize: " 0.7rem"}} >Publish</button>}
            <button onClick={() =>navigate({pathname: '/add-category'}, {state: data})} className="card-link btn-sm  btn-primary" style={{fontSize: " 0.7rem"}}>+Categories</button>
            <button onClick={()=> { dispatch(closeAwardsAction(data))}} className="card-link btn-sm btn-primary" ><i className="bi bi-pen" style={{fontSize: " 0.7rem"}}></i></button>
          </div>
        </div>
      </div>



    </>
  );
};
// export default Awards;

