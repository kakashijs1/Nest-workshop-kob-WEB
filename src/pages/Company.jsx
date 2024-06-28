import { useEffect, useState } from "react";
import BackOffice from "../components/BackOffice";
import config from "../config";
import axios from "axios";
import Swal from "sweetalert2";

function Company() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/api/company/info");

      if (res.data.id !== undefined) {
        setName(res.data.name);
        setPhone(res.data.name);
        setAddress(res.data.address);
        setId(res.data.id);
      }
    } catch (e) {
      Swal.fire({
        title: "error",
        text: e.message,
        icon: "error",
      });
    }
  };
  const handleSave = async () => {
    try {
      const payload = {
        name: name,
        phone: phone,
        address: address,
      };

      let res;
      if (id == 0) {
        res = await axios.post(config.apiPath + "/api/company/create", payload);
        setId(0);
      } else {
        res = await axios.put(
          config.apiPath + "/api/company/edit/" + id,
          payload
        );
      }
      if (res.data.id !== undefined) {
        Swal.fire({
          title: "Save",
          text: "บักทึกข้อมูลเรียบร้อย",
          icon: "success",
          timer: 1500,
        });
      }
      fetchData();
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
      <BackOffice>
        <button type="button" class="btn btn-outline-success mt-2 ms-3 mb-1">
          <h4>ข้อมูลร้าน</h4>
        </button>
        <div className="card m-3">
          <div className="container p-5">
            <div>
              <label>ชื่อ</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label>เบอร์โทร</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mt-3">
              <label>ที่อยู่</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mt-3">
              <button onClick={handleSave} className="btn btn-primary">
                <i className="fa fa-check me-2"></i>Save
              </button>
            </div>
          </div>
        </div>
      </BackOffice>
    </>
  );
}

export default Company;
