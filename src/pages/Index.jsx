import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import config from "../config";

function Index() {
  const [lottos, setLottos] = useState([]);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");

  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const ref5 = useRef();
  const ref6 = useRef();

  const handleChangeInput1 = (value) => {
    if (value.length > 0) {
      setInput1(value);
      ref2.current.focus();
    }
  };

  const handleChangeInput2 = (value) => {
    if (value.length > 0) {
      setInput2(value);
      ref3.current.focus();
    }
  };

  const handleChangeInput3 = (value) => {
    if (value.length > 0) {
      setInput3(value);
      ref4.current.focus();
    }
  };

  const handleChangeInput4 = (value) => {
    if (value.length > 0) {
      setInput4(value);
      ref5.current.focus();
    }
  };

  const handleChangeInput5 = (value) => {
    if (value.length > 0) {
      setInput5(value);
      ref6.current.focus();
    }
  };

  const handleChangeInput6 = (value) => {
    if (value.length > 0) {
      setInput6(value);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/api/lotto/list");
      setLottos(res.data.results);
      console.log(res);
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
      <div className="text-center mt-4 h3">
        ล็อตเตอรี่ออนไลน์
        <div className="mt-3">
          <input
            style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input1}
            onChange={(e) => handleChangeInput1(e.target.value)}
          />
          <input
            style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input2}
            ref={ref2}
            onChange={(e) => handleChangeInput2(e.target.value)}
          />
          <input
            style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input3}
            ref={ref3}
            onChange={(e) => handleChangeInput3(e.target.value)}
          />
          <input
            style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input4}
            ref={ref4}
            onChange={(e) => handleChangeInput4(e.target.value)}
          />
          <input
            style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input5}
            ref={ref5}
            onChange={(e) => handleChangeInput5(e.target.value)}
          />
          <input
            style={{ width: "50px" }}
            className="text-center"
            placeholder="9"
            value={input6}
            ref={ref6}
            onChange={(e) => handleChangeInput6(e.target.value)}
          />
        </div>
      </div>

      <div className="text-center mt-5">
        <button className="btn btn-primary ">
          ค้นหา
          <i className="fa fa-search me-2 " />
        </button>
      </div>

      <div className="mt-3 container-fluid ps-5 pe-5 ">
        <div className="row">
          {lottos.length > 0
            ? lottos.map((item) => (
                <div className="col-3">
                  <div className="card mt-1">
                    <div className="card-body text-center">
                      <div className="h3">{item.number}</div>
                      <div className="text-success h5">{item.sale} บาท</div>
                      <div className="mt-3">
                        <button className="btn btn-primary">
                          <i className="fa fa-shopping-cart me-2"></i>
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default Index;
