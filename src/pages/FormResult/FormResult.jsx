import { Button, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import CompHeading from "../../components/Heading/CompHeading";

const alphabet = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

const FormResult = ({ setGlobalLoaderText, setGlobalLoaderStatus }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const { generatedResult, formInfo } = location.state;

  useEffect(() => {
    console.log("generatedResult", generatedResult);
    console.log("formInfo", formInfo);
    generatedResult.forEach((result) => {
      if (arraysAreEqual(result.correctAnswer, result.responseAnswer)) {
        setNumberOfCorrectAnswers((prev) => prev + 1);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 p-10">
      <div className="w-full flex items-center justify-between">
        <CompHeading heading={`Viewing Results for - ${formInfo?.formId}`} />

        <Button variant="outlined" onClick={() => navigate(-1)} size="small">
          Go Back
        </Button>
      </div>
      <div className="w-full flex flex-col gap-2 px-10 text-lg">
        <div className="w-full flex items-center justify-between">
          <p>Form ID: {formInfo?.formId}</p>
          <p>Duration: {formInfo?.formDuration}mins</p>
        </div>
        <div className="w-full flex items-center justify-between">
          <p>Form Name: {formInfo?.formName}</p>
          <p>Due Date: {formInfo?.formDueDate}</p>
        </div>
        <p>Total Questions: {generatedResult.length}</p>
        <p>
          Correct Answers: {numberOfCorrectAnswers}/{generatedResult.length}
        </p>
        <p>
          Percentage: {(numberOfCorrectAnswers / generatedResult.length) * 100}%
        </p>
      </div>
      <div className="w-full flex flex-col px-10 gap-5 -mt-3">
        {generatedResult.map((_result, i) => {
          return (
            <div className="w-full flex flex-col gap-1" key={i}>
              <p className="text-2xl">
                Q{i + 1}. {_result["Question Text"]}
              </p>
              <div className="flex flex-col px-4 gap-2">
                {_result.Option.map((option, opIndex) => {
                  return (
                    <div className="flex items-center gap-3" key={option}>
                      <GiCheckMark
                        className={`${
                          _result.responseAnswer.includes(option)
                            ? "visible"
                            : "invisible"
                        }`}
                      />

                      <p>
                        {alphabet[opIndex]}. {option}
                      </p>
                      {_result.correctAnswer.includes(option) && (
                        <Chip
                          label="CORRECT"
                          variant="outlined"
                          color="success"
                          size="small"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormResult;
