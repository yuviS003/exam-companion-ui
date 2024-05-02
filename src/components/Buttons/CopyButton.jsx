import { Button } from "@mui/material"; // Import the Material-UI Button component
import { enqueueSnackbar } from "notistack";
import { FaRegCopy } from "react-icons/fa";

const CopyLinkButton = ({ link }) => {
  // Define the link you want to copy
  const linkToCopy = link;

  // Create a function to handle the button click
  const handleCopyLink = async () => {
    try {
      // Use the Clipboard API to copy the link to the clipboard
      await navigator.clipboard.writeText(linkToCopy);
      // Optionally, you can display a success message
      console.log("Link copied to clipboard!");
      enqueueSnackbar("Link copied to clipboard!", { variant: "success" });
    } catch (error) {
      // Handle any errors that occur while copying
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <Button
      variant="test" // Choose the button variant (contained, outlined, text)
      onClick={handleCopyLink} // Attach the click handler
      startIcon={<FaRegCopy />} // Add an icon to the button
      size="small" // Choose the button size (small, medium, large)
      sx={{ color: "GrayText" }}
    >
      Copy Link
    </Button>
  );
};

export default CopyLinkButton;
