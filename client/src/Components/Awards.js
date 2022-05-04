


export const Awards = (item) => {
  const data = item?.item
  const image = data?.image?.toString()
  console.log(image)

  return (

    <>





      <div className='col'>
        <div className="card" style={{ width: "18rem" }}>
          <div className="embed-responsive embed-responsive-16by9 " style={{ height: "10rem" }}>

            <img src={image} className="card-img-top embed-responsive-item mh-100" alt="..." />
          </div>
          <div className="card-body">
            <h5 className="card-title">{data?.title}</h5>
            <p className="card-text">{data?.description}</p>
          </div>

          <div className="card-body ">
            <a href="/" className="card-link btn-sm btn btn-primary" >Publish</a>
            <a href="/" className="card-link btn btn-sm  btn-primary">Add Categories</a>
            <a href="/" className="card-link btn btn-sm btn-primary">Close</a>
          </div>
        </div>
      </div>



    </>
  );
};
// export default Awards;

