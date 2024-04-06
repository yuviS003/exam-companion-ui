import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

const DeleteQuesDialog = ({
  openDeleteConfirmDialog,
  setOpenDeleteConfirmDialog,
  handleDeleteQuestionFunc,
}) => {
  return (
    <Dialog
      open={openDeleteConfirmDialog}
      onClose={() => {
        setOpenDeleteConfirmDialog(false);
      }}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you you want to delete this question? This is an irreversible
          operation.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenDeleteConfirmDialog(false);
          }}
        >
          Cancel
        </Button>
        <Button onClick={handleDeleteQuestionFunc} autoFocus>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteQuesDialog;
