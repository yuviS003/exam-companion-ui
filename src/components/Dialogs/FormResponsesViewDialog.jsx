import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "react-scroll";

const FormResponsesViewDialog = ({
  formResponsesDialog,
  handleFormResponsesDiagClose,
  joinedResponseData,
}) => {
  const navigate = useNavigate();

  const showResult = (joinedResp) => {
    console.log("show results for--> ", joinedResp);
    const formInfo = {
      formId: joinedResp.formId,
      formName: joinedResp.formName,
      formDueDate: joinedResp.formDueDate,
      formDuration: joinedResp.formDuration,
      formDescription: joinedResp.formDescription,
    };
    // construct the current form result
    const formResult = {
      formId: joinedResp.formId,
      formName: joinedResp.formName,
      formDueDate: joinedResp.formDueDate,
      formDuration: joinedResp.formDuration,
      formDescription: joinedResp.formDescription,
      formQuestions: JSON.parse(joinedResp.formOriginalQuestions),
      formResponses: JSON.parse(joinedResp.formResponse),
    };
    console.log("formResult", formResult);

    const generatedResult = formResult.formQuestions.map((originalQuestion) => {
      const responseToQuestions = formResult.formResponses.find(
        (response) =>
          response["Question Text"] === originalQuestion["Question Text"]
      );
      const questionResult = {
        ...originalQuestion,
        correctAnswer: String(originalQuestion["Answer"]).split(","),
        responseAnswer: formResult.formResponses.find(
          (response) =>
            response["Question Text"] === originalQuestion["Question Text"]
        )["Answer"],
      };

      delete questionResult.Answer;
      console.log("originalQuestion", originalQuestion);
      console.log("responseToQuestions", responseToQuestions);
      console.log("questionResult", questionResult);
      return questionResult;
    });

    console.log("formInfo", formInfo);
    console.log("generatedResult", generatedResult);
    navigate("/dashboard/form-result", {
      state: {
        generatedResult,
        formInfo,
      },
    });
  };
  return (
    <Dialog
      open={formResponsesDialog}
      onClose={handleFormResponsesDiagClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{}}
    >
      <DialogTitle id="alert-dialog-title">Showing All Responses</DialogTitle>
      <DialogContent>
        <div className="max-h-[400px] overflow-auto">
          <table className="table-fixed border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-x border-gray-400 bg-[#4338ca] text-white"></th>
                <th className="p-2 border-x border-gray-400 bg-[#4338ca] text-white">
                  Name
                </th>
                <th className="p-2 border-x border-gray-400 bg-[#4338ca] text-white">
                  Username
                </th>
                <th className="p-2 border-x border-gray-400 bg-[#4338ca] text-white">
                  Email
                </th>
                <th className="p-2 border-x border-gray-400 bg-[#4338ca] text-white">
                  Attempted At
                </th>
                <th className="p-2 border-x border-gray-400 bg-[#4338ca] text-white"></th>
              </tr>
            </thead>
            <tbody>
              {joinedResponseData.map((joinedResp, index) => (
                <tr key={index}>
                  <td className="p-2 border border-[#4338ca]">{index + 1}</td>
                  <td className="p-2 border border-[#4338ca]">
                    {joinedResp.responseName}
                  </td>
                  <td className="p-2 border border-[#4338ca]">
                    {joinedResp.responseUserName}
                  </td>
                  <td className="p-2 border border-[#4338ca]">
                    {joinedResp.responseUserEmail}
                  </td>
                  <td className="p-2 border border-[#4338ca]">
                    {joinedResp.responseCreatedAt.split("T")[0]}
                  </td>
                  <td className="p-2 border border-[#4338ca]">
                    <button
                      className="text-[#4338ca] text-xs"
                      onClick={() => showResult(joinedResp)}
                    >
                      Show Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormResponsesDiagClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormResponsesViewDialog;
