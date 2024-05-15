import { Button } from "@mui/material";

const PurpleContainedButton = ({
  onClick = () => {},
  startIcon = <></>,
  btnText = "",
  type = "button",
  width = 300,
  size = "medium",
}) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "#4338CA",
        fontSize: 15,
        "&:hover": { backgroundColor: "#4338CA" },
        width: width,
      }}
      startIcon={startIcon}
      type={type}
      size={size}
    >
      {btnText}
    </Button>
  );
};

export default PurpleContainedButton;
