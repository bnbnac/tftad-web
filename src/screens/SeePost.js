import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
function SeePost() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_WEB_SERVER}/posts/${postId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>SeePost {postId}</h1>
      <hr />
      <li key={post.id}>{post.id}</li>
      <li key={post.title}>{post.title}</li>
      <li key={post.content}>{post.content}</li>
      <li key={post.published}>{post.published}</li>
      <li key={post.videoUrl}>{post.videoUrl}</li>

      {post.questions &&
        post.questions.map((question) => (
          <div key={question.id}>
            <li>qid{question.id}</li>
            <li>author int{question.authorIntention}</li>
            <li>filename{question.filename}</li>
            <li>
              addr
              {`${process.env.REACT_APP_STORAGE_SERVER}/questions/${question.filename}`}
            </li>
            <video id="player" controls crossorigin="use-credentials">
              <source
                src={`${process.env.REACT_APP_STORAGE_SERVER}/questions/${question.filename}`}
                type="video/mp4"
              ></source>
            </video>
          </div>
        ))}

      <Link to="answer">see answer</Link>
      <Outlet context={{ nonParamProp: "this is not from params" }} />
    </div>
  );
}

export default SeePost;
