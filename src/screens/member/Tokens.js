import React, { useState, useEffect } from "react";
import Api from "../../tools/Api";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: Arial, sans-serif;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #f2f2f2;
  font-weight: bold;
`;

const Td = styled.td`
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

const LogoutButton = styled.button`
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Tokens = () => {
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await Api.get("/auth/tokens");
        setTokens(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchTokens();
  }, []);

  const handleLogout = async (tokenId) => {
    try {
      await Api.delete(`/auth/logout/${tokenId}`);
      setTokens(tokens.filter((token) => token.id !== tokenId));
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Active Sessions</h1>
      <Table>
        <thead>
          <tr>
            <Th>Created At</Th>
            <Th>Client IP</Th>
            <Th>User Agent</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <Tr key={token.id}>
              {/* <Td>{new Date(token.createdAt).toLocaleString()}</Td> */}
              <Td>{token.createdAt}</Td>
              <Td>{token.clientIp}</Td>
              <Td>{token.userAgent}</Td>
              <Td>
                <LogoutButton onClick={() => handleLogout(token.id)}>
                  Logout
                </LogoutButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tokens;
