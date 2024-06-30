import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import animation from "../../../assets/animations/loginAnimation.gif";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/Firebasestore";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../config/userSlice";
import SuccessAlert from "../../SuccessAlert/SuccessAlert";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((store) => store.User);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const isLogin = await signInWithEmailAndPassword(
        auth,
        isEmail,
        isPassword
      );
      dispatch(getUserInfo(isLogin?.user?.uid));
      setAlertSeverity("success");
      setAlertMessage("Log In successfully");
      setOpenAlert(true); // Show the alert
      setTimeout(() => {
        navigate("/");
        setIsEmail("");
        setIsPassword("");
      }, 400);
    } catch (error) {
      setAlertSeverity("error");
      setAlertMessage(error.code);
      setOpenAlert(true);
      setIsEmail("");
      setIsPassword("");
      console.log(error);
    }
  };

  return (
    <>
      <SuccessAlert
        state={[openAlert, setOpenAlert]}
        message={alertMessage}
        severity={alertSeverity}
      />
      <section className="h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8">
        <Fade in={true}>
          <Container>
            <div className="grid md:grid-cols-2">
              <div className="col hidden md:flex items-center justify-center">
                <img
                  className="lg:max-h-80 max-h-[17rem]"
                  src={animation}
                  alt="login"
                />
              </div>
              <div className="flex md:justify-start justify-center">
                <div className="flex items-center max-w-[26rem] p-4 h-80">
                  <div className="lg:space-y-10 md:space-y-8 space-y-10">
                    <h3 className="text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl">
                      Log In
                    </h3>
                    <div className="text-center lg:space-y-7 md:space-y-6 space-y-7">
                      <TextField
                        label="Email"
                        size="small"
                        fullWidth
                        color="success"
                        variant="outlined"
                        onChange={(e) => setIsEmail(e.target.value)}
                        value={isEmail}
                      />
                      <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        size="small"
                        onChange={(e) => setIsPassword(e.target.value)}
                        color="success"
                        variant="outlined"
                        value={isPassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                size="small"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <VisibilityOff fontSize="inherit" />
                                ) : (
                                  <Visibility fontSize="inherit" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        sx={{ textTransform: "capitalize" }}
                        type="submit"
                        color="success"
                        variant="contained"
                        onClick={handleSignIn}
                      >
                        Log in
                      </Button>
                      <p>
                        Create an account?{" "}
                        <span
                          className="text-green-700 cursor-pointer"
                          onClick={() => navigate("/Register")}
                        >
                          Sign Up
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Fade>
      </section>
    </>
  );
};

export default Login;
