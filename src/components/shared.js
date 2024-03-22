import styled from "styled-components";

export const Title = styled.h2`
  display: flex;
`;

export const TitleSmall = styled.h3`
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

export const PostContainer = styled.span`
  border: 1px solid darkorchid;
  display: flex;
  width: 400px;
  margin: 10px;
  padding: 5px;
  background-color: mintcream;
  border-radius: 5px;
`;

export const ButtonContainer = styled.span`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  max-width: 1000px;
  padding: 50px;
  margin: 10px auto;
  background-color: white;
  border-radius: 30px;
`;
