import axios from "axios";
import { useEffect } from "react";

const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

const AllForms = () => {
  const fetchAllFormsByUserId = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${apiUrl}/api/form/user/${
        JSON.parse(localStorage.getItem("quizzo_current_user"))._id
      }`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("quizzo_token")}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllFormsByUserId();
  }, []);
  return <div className="flex flex-col gap-5 p-10">AllForms</div>;
};

export default AllForms;
