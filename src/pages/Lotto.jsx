import { useEffect, useState, useRef } from "react";
import BackOffice from "../components/BackOffice";
import config from "../config";
import axios from "axios";
import Swal from "sweetalert2";

function Lotto() {
  const [number, setNumber] = useState("");
  const [roundNumber, setRoundNumber] = useState("");
  const [bookNumber, setBookNumber] = useState("");
  const [cost, setCost] = useState("");
  const [sale, setSale] = useState("");
  const [lottos, setLottos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const myRef = useRef();
  const [id, setId] = useState(0);

  useEffect(() => {
    myRef.current.focus();
    fetchData();
  }, []);

  const clearForm = () => {
    setNumber("");
    setRoundNumber("");
    setBookNumber("");
    setCost("");
    setSale("");
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(config.apiPath + "/api/lotto/list");
      if (res.data.results !== undefined) {
        setLottos(res.data.results);
      }
    } catch (e) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      const payload = {
        number: number,
        roundNumber: roundNumber ? parseInt(roundNumber) : null,
        bookNumber: bookNumber ? parseInt(bookNumber) : null,
        cost: cost ? parseInt(cost) : null,
        sale: sale ? parseInt(sale) : null,
      };

      if (payload.roundNumber === null) {
        throw new Error("กรุณากรอกงวดที่");
      }

      let res;

      if (id === 0) {
        res = await axios.post(config.apiPath + "/api/lotto/create", payload);
      } else {
        res = await axios.put(
          config.apiPath + "/api/lotto/edit/" + id,
          payload
        );
      }
      if (res.data.result !== undefined) {
        clearForm();
        myRef.current.focus();
        myRef.current.select();
        fetchData();
        setId(0);
      }
    } catch (e) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleDelete = async (item) => {
    try {
      Swal.fire({
        title: "ยืนยันการลบ",
        text: "คุณแน่ใจว่าจะลบหรือไม่",
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
      }).then(async (res) => {
        if (res.isConfirmed) {
          const resFromApi = await axios.delete(
            config.apiPath + "/api/lotto/remove/" + item.id
          );
          if (resFromApi.data.result.id !== undefined) {
            Swal.fire({
              title: "ลบสำเร็จ",
              text: "ลบข้อมูลเรียบร้อยแล้ว",
              icon: "success",
              timer: 500,
            });
            fetchData();
          }
        }
      });
    } catch (e) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: e.message,
        icon: "error",
      });
    }
  };

  const handleEdit = (item) => {
    setNumber(item.number);
    setRoundNumber(item.roundNumber);
    setBookNumber(item.bookNumber);
    setCost(item.cost);
    setSale(item.sale);
    setId(item.id);
  };

  const filteredLottos = lottos.filter((item) =>
    item.number.includes(searchTerm)
  );

  return (
    <BackOffice>
      <div className="container my-4">
        <div className="card p-4">
          <div className="h4 text-center mb-4">ข้อมูลล็อตเตอรี่</div>
          <div className="alert alert-info">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-2">
                <label>เลข</label>
                <input
                  value={number}
                  ref={myRef}
                  onChange={(e) => setNumber(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <label>เล่มที่</label>
                <input
                  value={bookNumber}
                  onChange={(e) => setBookNumber(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <label>งวดที่</label>
                <input
                  value={roundNumber}
                  onChange={(e) => setRoundNumber(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label>ราคาทุน</label>
                <input
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                <label>ราคาจำหน่าย</label>
                <input
                  value={sale}
                  onChange={(e) => setSale(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button onClick={handleSave} className="btn btn-primary">
                <i className="fa fa-check"></i> บันทึก
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="ค้นหาหมายเลข"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />
        </div>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>เล่มที่</th>
              <th>งวดที่</th>
              <th>เลข</th>
              <th>ราคาทุน</th>
              <th>ราคาจำหน่าย</th>
              <th className="text-center" width="110px">
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredLottos.length > 0 ? (
              filteredLottos.map((item) => (
                <tr key={item.id}>
                  <td>{item.bookNumber}</td>
                  <td>{item.roundNumber}</td>
                  <td>{item.number}</td>
                  <td>{item.cost}</td>
                  <td>{item.sale}</td>
                  <td className="text-center">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-primary me-2"
                    >
                      <i className="fa fa-pencil"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-danger"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </BackOffice>
  );
}

export default Lotto;
