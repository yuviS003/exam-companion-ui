import { Link } from "react-router-dom";
import { TextField, Button, Paper, Typography } from "@mui/material";
import Logo from "../../components/Logo/Logo";

const Login = ({ currentTheme }) => {
  return (
    <div className="flex items-start justify-center h-[90vh] pt-24">
      <Paper elevation={7} className="py-12 px-10 max-w-md">
        <Logo
          currentTheme={currentTheme}
          className="mx-auto mb-4 w-[200px] bg-cover"
        />
        <p className="w-full text-center -mt-4 mb-4 text-xs italic">
          Answering questions!
        </p>
        <form>
          <div className="mb-6">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              placeholder="Enter your registered email"
              type="email"
              required
              sx={{ width: 300 }}
              // size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="mb-6">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              placeholder="**********"
              type="password"
              required
              // size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ color: "white" }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" component="div" sx={{ mt: 2 }}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </Typography>
      </Paper>
    </div>
  );
};

export default Login;
