import { Link } from "react-router-dom";
import { TextField, Button, Paper, Typography } from "@mui/material";
import Logo from "../../components/Logo/Logo";

const Signup = ({ currentTheme }) => {
  return (
    <div className="flex items-start justify-center h-[90vh] pt-4 md:pt-24">
      <Paper elevation={7} className="py-8 px-8 md:py-12 md:px-10">
        <Logo
          currentTheme={currentTheme}
          className="mx-auto mb-4 w-[200px] bg-cover"
        />
        <p className="w-full text-center -mt-4 mb-6 text-xs italic">
          Answering questions!
        </p>
        <form>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="mb-6">
              <TextField
                label="Name"
                variant="outlined"
                type="text"
                required
                sx={{ width: 300 }}
                // size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What is your name?"
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Username"
                variant="outlined"
                type="text"
                required
                sx={{ width: 300 }}
                // size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What username do you want to have?"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="mb-6">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                sx={{ width: 300 }}
                // size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="What is your email?"
              />
            </div>
            <div className="mb-6">
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                required
                sx={{ width: 300 }}
                // size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Have a strong password!"
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ color: "white" }}
          >
            Sign Up
          </Button>
        </form>
        <Typography variant="body2" component="div" sx={{ mt: 2 }}>
          Do you have an account already?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Signup;
