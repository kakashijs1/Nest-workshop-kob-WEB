import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";

function Navbar() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                config.apiPath + "/api/user/info",
                config.headers()
            );

            setUserName(res.data.payload.username);
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e,
                icon: "error",
            });
        }
    };


    return <>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="index3.html" className="nav-link">Home</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="#" className="nav-link">Contact</Link>
                </li>
                <button type="button" class="btn btn-secondary">
                    USER : {userName} <span class="badge bg-secondary">ผู้ใช้</span>
                </button>

            </ul>

            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i className="fas fa-search" />
                    </Link>
                    <div className="navbar-search-block">
                        <form className="form-inline">
                            <div className="input-group input-group-sm">
                                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-navbar" type="submit">
                                        <i className="fas fa-search" />
                                    </button>
                                    <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments" />
                        <span className="badge badge-danger navbar-badge">3</span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <Link to="#" className="dropdown-item">
                            <div className="media">
                                <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Brad Diesel
                                        <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                                    </h3>
                                    <p className="text-sm">Call me whenever you can...</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                </div>
                            </div>
                        </Link>
                        <div className="dropdown-divider" />
                        <Link to="#" className="dropdown-item">
                            <div className="media">
                                <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        John Pierce
                                        <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                                    </h3>
                                    <p className="text-sm">I got your message bro</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                </div>
                            </div>
                        </Link>
                        <div className="dropdown-divider" />
                        <Link to="#" className="dropdown-item">
                            <div className="media">
                                <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        NorLink toSilvester
                                        <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                                    </h3>
                                    <p className="text-sm">The subject goes here</p>
                                    <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                </div>
                            </div>
                        </Link>
                        <div className="dropdown-divider" />
                        <Link to="#" className="dropdown-item dropdown-footer">See All Messages</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell" />
                        <span className="badge badge-warning navbar-badge">15</span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider" />
                        <Link to="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2" /> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </Link>
                        <div className="dropdown-divider" />
                        <Link to="#" className="dropdown-item">
                            <i className="fas fa-users mr-2" /> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </Link>
                        <div className="dropdown-divider" />
                        <Link to="#" className="dropdown-item">
                            <i className="fas fa-file mr-2" /> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </Link>
                        <div className="dropdown-divider" />
                        <Link to="#" className="dropdown-item dropdown-footer">See All Notifications</Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                        <i className="fas fa-th-large" />
                    </Link>
                </li>
            </ul>
        </nav>

    </>
}

export default Navbar;