import { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";

function Home() {
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
  return (
    <>
      <div className="sidebar">
        <div>BackOffice</div>
        <div>USER: {userName}</div>
      </div>

      <div className="content"></div>
    </>
  );
}

export default Home;
