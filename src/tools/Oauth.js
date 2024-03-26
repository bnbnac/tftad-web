import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_WEB_SERVER}/channels/direct?code=${code}`,
            {
              method: "POST",
              credentials: "include",
            }
          );
          if (!response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            navigate("/profiles");
          } else {
            navigate("/profiles");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
    return <div>Loading...</div>;
  });
};

export default OAuth;
