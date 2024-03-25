import styled from "styled-components";
import { StyledA } from "./shared";

const Image = styled.img`
  height: 60px;
  border-radius: 50px;
`;

const Info = styled.span`
  display: flex;
  margin-bottom: 5px;
`;

const Channel = ({ channel }) => {
  if (!channel) {
    return <div>Loading...</div>;
  }

  return (
    <StyledA
      href={`https://www.youtube.com/channel/${channel.youtubeChannelId}`}
    >
      <Info style={{ margin: "10px" }}>
        <Image src={`${channel.thumbnail}`} />
      </Info>
      <Info style={{ margin: "10px" }}>{channel.title}</Info>
    </StyledA>
  );
};

export default Channel;
