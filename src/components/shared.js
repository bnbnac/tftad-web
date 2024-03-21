import styled from "styled-components";

export const Title = styled.h2`
  display: flex;
`;

export const BaseBox = styled.div`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
`;

export const FatText = styled.span`
  font-weight: 600;
`;
