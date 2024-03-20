import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostProgress() {
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

    fetchPost();
    fetchPosition();
  }, [postId]);

  return (
    <div>
      <h1>Post Progress</h1>
      {position && (
        <div>
          <p>Current Position: {position.position.current}</p>
          <p>Initial Position: {position.position.initial}</p>
          <p>Published: {position.published ? "Yes" : "No"}</p>
          <p>State: {position.state}</p>
          <p>Current Frame: {position.cur_frame}</p>
          <p>Total Frames: {position.total_frame}</p>
        </div>
      )}
    </div>
  );
}

export default PostProgress;
