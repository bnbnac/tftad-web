import { useOutletContext, useParams } from "react-router-dom";

function Answer() {
  const { questionId } = useParams();
  const { nonParamProp } = useOutletContext();

  return (
    <h3>
      the answer of {questionId} is {nonParamProp}
    </h3>
  );
}

export default Answer;
