import { Link } from "react-router-dom";


export const  Sidebar= () => {
    return (
<div className="container-fluid">
    <div className="row">
        <div className="col-sm-auto bg-light sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-left sticky-top">
                               <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-1 text-center align-items-left">
                    <li className="nav-item">
                        <Link to="/" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                            <i className="bi-house fs-1"></i> <span><p>Home</p></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                            <i className="bi-speedometer2 fs-1"></i> <span><p>Dashboard</p></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/all-awards" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                        <i className="bi bi-award fs-1"></i><span><p>Awards</p></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/all-categories" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products">
                        <i className="bi bi-trophy fs-1"></i> <span><p>Categories</p></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contestants" className="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                            <i className="bi-people fs-1"></i><span><p>Contestants</p></span>
                        </Link>
                    </li>
                </ul>
                <div className="dropdown">
                    <Link to="/profile" className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi-person-circle h2"></i>
                    </Link>
                    <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
                        <li><a className="dropdown-item" href="/logout">Logout</a></li>
                        <li><a className="dropdown-item" href="/update-password">Change Password</a></li>
                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-sm p-3 min-vh-100">
            {/* <!-- content --> */}
        </div>
    </div>
</div>
    )
};

