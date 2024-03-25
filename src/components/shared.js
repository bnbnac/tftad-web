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
  width: 350px;
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

export const Button = styled.button`
  width: 60px;
  background-color: #0f52ba;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin: 10px auto;
  cursor: pointer;
`;

export const StyledA = styled.a`
  width: 100px;
  background-color: #0f52ba;
  text-decoration: none;
  font-family: sans-serif;
  display: block;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin: 10px auto;
  cursor: pointer;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ButtonFormal = styled.button`
  padding: 10px 20px;
  background-color: #0f52ba;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;
