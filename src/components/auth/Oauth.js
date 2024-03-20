import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      fetch(
        `${process.env.REACT_APP_WEB_SERVER}/oauth/login/google?code=${code}`,
        {
          method: "GET",
          credentials: "include",
        }
      )
        .then((response) => {
          if (response.ok) {
            navigate("/profiles");
          } else {
            console.error(
              "Failed to exchange authorization code:",
              response.statusText
            );
            navigate("/profiles");
          }
        })
        .catch((error) => {
          console.error("Error exchanging authorization code:", error);
          navigate("/profiles");
        });
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuth;
