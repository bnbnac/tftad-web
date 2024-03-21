import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Title } from "../../components/shared";

function PostProgress() {
  const PostProgressContainer = styled.span`
    display: flex;
    flex-direction: column;
  `;

  const PostContainer = styled.span`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 100%;
    margin-bottom: 15px;
  `;

  const ProgressContainer = styled.span`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    color: #0f52ba;
    font-weight: 600;
  `;

  const Explanation = styled.span`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  `;

  const PostInfo = styled.span`
    display: flex;
    margin-bottom: 5px;
  `;

  const ProgressInfo = styled.span`
    display: flex;
    align-content: space-between;
    width: 100%;
    margin-bottom: 5px;
  `;

  const Line = styled.span`
    display: flex;
    width: 100%;
    margin-bottom: 5px;
  `;

  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const post = await response.json();
        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchPosition = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/extractor/position/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch position");
        }
        const position = await response.json();
        if (position.published) {
          navigate(`/posts/${postId}`);
        }
        setPosition(position);
      } catch (error) {
        console.error("Error fetching position:", error);
      }
    };

    fetchPosition();
    fetchPost();
  }, [postId]);

  return (
    <PostProgressContainer>
      <Title>Post Progress</Title>
      {post && (
        <PostContainer>
          <PostInfo>제목: {post.title}</PostInfo>
          <PostInfo>게시일: 어쩌고저쩌고</PostInfo>
        </PostContainer>
      )}
      {position && (
        <ProgressContainer>
          <ProgressInfo>
            <Line>상태: </Line>
            <Line>{position.state}</Line>
          </ProgressInfo>
          <ProgressInfo>
            <Line>현재대기열/최초대기열</Line>
            <Line>
              {position.position.current}/{position.position.initial}
            </Line>
          </ProgressInfo>
          <ProgressInfo>
            <Line>현재프레임/총프레임 </Line>
            <Line>
              {position.cur_frame}/{position.total_frame}
            </Line>
          </ProgressInfo>
        </ProgressContainer>
      )}
      <Explanation>
        <Line>Progress 해석하는 방법</Line>
      </Explanation>
      <Explanation>
        <Line>
          상태: 작업 진행 상태를 표시합니다. waiting - downloading - analysis -
          cutting - sync - response 순으로 진행되며 analysis에 긴 시간이
          소모됩니다.
        </Line>
      </Explanation>
      <Explanation>
        <Line>
          대기열: 게시를 요청하면, 작업 대기열에서 순서를 기다리게 됩니다.
          최초대기열 순번과 현재대기열 순번을 표시합니다. 현재대기열이 0이 되면
          작업을 시작한 것입니다.
        </Line>
      </Explanation>
      <Explanation>
        <Line>
          프레임: analysis 작업중인 경우 진행중인 프레임을 표시합니다. 요청하신
          영상의 총 프레임과 현재 분석중인 프레임을 표시합니다.
        </Line>
      </Explanation>
    </PostProgressContainer>
  );
}

export default PostProgress;
