import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";

const OAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        try {
          const response = await Api.post(
            `${process.env.REACT_APP_WEB_SERVER}/channels?code=${code}`
          );
          if (!response.status === 200) {
            const responseBody = response.data;
            console.log(responseBody);
            navigate("/profiles");
          } else {
            navigate("/profiles");
          }
        } catch (error) {
          console.error(
            "Error fetching data:",
            error.response?.data || error.message
          );
        }
      }
    };
    fetchData();
  });
};

export default OAuth;
