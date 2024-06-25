import React, { useState } from "react";
import "./Login.css"; // assuming you have this CSS file for custom styles
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const payload = {
        usr: username,
        pwd: password,
      };

      const res = await axios.post(config.apiPath + "/api/user/login", payload);

      if (res.data.token !== undefined) {
        const token = res.data.token.access_token;
        localStorage.setItem("lotto_token", token);
        navigate("/home");
      } else {
        Swal.fire({
          title: "Login",
          text: "โปรดใส่ Username และ Password ให้ถูกต้อง",
          icon: "info",
        });
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e,
        icon: "error",
      });
    }
  };

  return (
    <>
      {/* <div className="topImage mt-3">
        <img
          src="/images/final-horizontal-white.png"
          className=""
          style={{ width: "1060px" }}
          alt="Featured"
        />
      </div> */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#30A4DC" }}
          >
            <div className="featured-image mb-3">
              <img
                src="/images/kwan.jpg"
                className="img-fluid"
                style={{ width: "560px" }}
                alt="Featured"
              />
            </div>
            <p
              className="text-white fs-2"
              style={{
                fontFamily: "'Courier New', Courier, monospace",
                fontWeight: 600,
              }}
            >
              Login make your Work
            </p>
            <small
              className="text-white text-wrap text-center"
              style={{
                width: "17rem",
                fontFamily: "'Courier New', Courier, monospace",
              }}
            >
              หากพบปัญหาใดๆ ติดต่อเจ้าหน้าที่ Developer ทันที
            </small>
          </div>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>เข้าสู่ระบบ Admin </h2>
                <p>เข้าสู่ระบบสำหรับพนักงาน</p>
              </div>
              <div>
                <i className="fa fa-user mb-3 me-1"></i>
                ผู้ใช้
              </div>
              <div className="input-group mb-3">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Username"
                />
              </div>
              <div>
                <i className="fa fa-lock mb-3 me-2"></i>
                รหัสผ่าน
              </div>
              <div className="input-group mb-1">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control form-control-lg bg-light fs-6"
                  placeholder="Password"
                />
              </div>
              <div className="input-group mt-3 mb-5 d-flex justify-content-between">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="formCheck"
                  />
                  <label
                    htmlFor="formCheck"
                    className="form-check-label text-secondary"
                  >
                    <small>Remember Me</small>
                  </label>
                </div>
                <div className="forgot">
                  <small>
                    <Link to="#">Forgot Password?</Link>
                  </small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  onClick={handleSignIn}
                  className="btn btn-lg btn-primary w-100 fs-6"
                >
                  SignIn <i className="fa fa-check"></i>
                </button>
              </div>
              <div className="input-group mb-3">
                <button className="btn btn-lg btn-light w-100 fs-6">
                  <img
                    src="/images/google.png"
                    s
                    style={{ width: "20px" }}
                    className="me-2"
                    alt="Google"
                  />
                  <small>สร้างบัญชี</small>
                </button>
              </div>
              <div className="row">
                <small>
                  Don't have an account? <Link to="#">Sign Up</Link>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
