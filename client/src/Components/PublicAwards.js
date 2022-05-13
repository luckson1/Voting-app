
import { useNavigate } from "react-router-dom";



export const PublicAwards = (award) => {
  // get award data from the award docs name award
  const data = award?.award
  
  const image = data?.image
 

  // initiate dispatch to handle reducer
 

  // enable navigation and sharing of state to another component 

const navigate =useNavigate()
  return (

    <>





      <div className='col-3'>
        <div className="card" style={{ width: "18rem" }}>
          <div className="embed-responsive embed-responsive-16by9 " style={{ height: "10rem" }}>

            <img src={image} className="card-img-top embed-responsive-item mh-100" alt="..." />
          </div>
          <div className="card-body">
            <h4 className="card-title" >{data?.title}</h4>
            <h6 className="card-title  btn-link text-warning" type="button" onClick={() =>navigate({pathname: '/award-details'}, {state: data})} ><i className="bi bi-folder-plus fs-5"> Browse  Categories</i></h6>
                  <p className="card-text">{data?.description}</p>
          </div>

          <div className="card-body ">
   
          </div>
        </div>
      </div>



    </>
  );
};
// export default Awards;

