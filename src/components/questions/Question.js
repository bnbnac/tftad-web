import { Link, Outlet, useParams } from "react-router-dom";

function Question() {
  const { questionId } = useParams();
  return (
    <div>
      <h1>Question {questionId}</h1>
      <hr />
      <Link to="answer">see answer</Link>
      <Outlet context={{ nonParamProp: "this is not from params" }} />
    </div>
  );
}

export default Question;
