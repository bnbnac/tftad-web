import React, { useState, useEffect } from "react";
import axios from "axios";

const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get("/auth/tokens");
        setTokens(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchTokens();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Active Sessions</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Created At</th>
            <th>Client IP</th>
            <th>User Agent</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.id}>
              <td>{token.id}</td>
              <td>{new Date(token.createdAt).toLocaleString()}</td>
              <td>{token.clientIp}</td>
              <td>{token.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tokens;
