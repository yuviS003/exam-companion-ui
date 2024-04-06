import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const EditQuesDialog = ({
  openEditConfirmDialog,
  setOpenEditConfirmDialog,
  currentQuestion,
  setCurrentQuestion,
}) => {
  return (
    <Dialog
      open={openEditConfirmDialog}
      onClose={() => {
        setOpenEditConfirmDialog(false);
      }}
    >
      <DialogTitle>Edit Question</DialogTitle>
      <DialogContent>
        <form className="w-full flex flex-col py-2 gap-5 min-w-[500px]">
          <TextField
            label="Question"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            required
            type="text"
            fullWidth
            value={currentQuestion["Question Text"]}
          />
          <FormControl fullWidth>
            <InputLabel>How should the options look like?</InputLabel>
            <Select
              value={currentQuestion?.Type}
              label="How should the options look like?"
              // onChange={(e) => handleCurrentQuesType(e.target.value)}
            >
              <MenuItem value={"Dropdown"}>Dropdown</MenuItem>
              <MenuItem value={"Checkbox"}>Checkbox</MenuItem>
              <MenuItem value={"Radio"}>Radio Buttons</MenuItem>
            </Select>
          </FormControl>
          <div className="flex flex-col">
            <Typography>Options</Typography>
            <div className="flex flex-wrap gap-2 items-center">
              {currentQuestion["Option"].map((_opt, i) => (
                <Chip
                  label={_opt}
                  variant="outlined"
                  // onDelete={() => {
                  //   handleOptionDelete(_opt);
                  // }}
                  key={i}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <TextField
              label="Add Option"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              required
              type="text"
              sx={{ width: 300 }}
            />
            <Button>Add</Button>
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpenEditConfirmDialog(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpenEditConfirmDialog(false);
          }}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuesDialog;
