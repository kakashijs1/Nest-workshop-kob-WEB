import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import Swal from "sweetalert2";
import axios from "axios";
import { useState, useEffect } from "react";

function Sidebar() {

    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(config.apiPath + '/api/user/info', config.headers());

            if (res.data.result !== undefined) {
                setUserName(res.data.result);
            }
            setUserName(res.data.payload.username);
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }


    const handleSignOut = async () => {
        try {
            const button = await Swal.fire({
                title: 'ออกจากระบบ',
                text: 'ยืนยันการออกจากระบบ',
                icon: 'question',
                showCancelButton: true,
                showConfirmButton: true
            })

            if (button.isConfirmed) {
                localStorage.removeItem('token');
                navigate('/');
            }
        } catch (e) {
            Swal.fire({
                title: 'error',
                text: e.message,
                icon: 'error'
            })
        }
    }
    return <>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to="#" className="brand-link">
                <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">ADMIN</span>
            </Link>

            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <Link to="#" className="d-block">USER : {userName}</Link>
                        <button onClick={handleSignOut} className="btn btn-danger mt-2">
                            <i className="fa fa-times mr-2"></i> Sign Out
                        </button>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-header">Menu</li>
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">
                                <i className="nav-icon fas fa-home"></i>
                                <p>
                                    Home
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/company" className="nav-link">
                                <i className="nav-icon fa fa-cog"></i>
                                <p>
                                    ข้อมูลร้าน
                                    <span className="badge badge-info right"></span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/lotto" className="nav-link">
                                <i className="nav-icon fa fa-file"></i>
                                <p>
                                    Lottery
                                    <span className="badge badge-info right">1000 ใบ</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/user" className="nav-link">
                                <i className="nav-icon fa fa-user" aria-hidden="true"></i>
                                <p>จัดการผู้ใช้</p>
                                <span className="badge badge-info right">1</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/product" className="nav-link">
                                <i className="nav-icon fa fa-box" aria-hidden="true"></i>
                                <p>Product</p>
                                <span className="badge badge-info right">1</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>

    </>
}

export default Sidebar;