import BackOffice from "../components/BackOffice";

function Company() {
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
              <input className="form-control" />
            </div>
            <div className="mt-3">
              <label>เบอร์โทร</label>
              <input className="form-control" />
            </div>
            <div className="mt-3">
              <label>ที่อยู่</label>
              <input className="form-control" />
            </div>

            <div className="mt-3">
              <button className="btn btn-primary">
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
