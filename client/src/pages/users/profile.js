import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfileAction } from '../../redux/slices/users/UserSlices';
export const Profile = () => {

  // create instance of dispatch
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserProfileAction())
  }, [dispatch]);

  //get state from store
  const profile = useSelector((state) => { return state?.users?.userProfile?.profile })





  const image = profile?.image

  const navigate = useNavigate();
  return (
    <section className="vh-100 " >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 mb-4 mb-lg-0">
            <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
              <div className="row g-0">
                <div className=" col-6 col-md-8 gradient-custom text-center text-primary">

                  <img src={image}
                    alt="Avatar" className="img-fluid my-5" style={{ width: "200px" }} />
                  <span><p>{profile?.firstname}</p><p>{profile?.lastname}</p></span>
                  <p>{profile?.companyTitle}</p>
                  <button
                    // onClick={() => navigate(history, "update-profile", profile)}
                    onClick={() => navigate({ pathname: '/updateProfile' }, { state: profile })}
                    className="  btn-outline-warning me-2 btn-sm "
                  >
                    Edit Profile
                    <i className="bi bi-pencil-square fs-4 mb-5"></i>
                  </button>

                </div>
                <div className=" col-6 col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">{profile?.email}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">{profile?.phoneNumber}</p>
                      </div>
                    </div>

                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>company</h6>
                        <p className="text-muted">{profile?.company}</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Most Viewed</h6>
                        <p className="text-muted">Dolor sit amet</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                      <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                      <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                      <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
