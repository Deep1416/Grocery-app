import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Collapse,
  Container,
  Fade,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import animationRegister from "../../../assets/animations/Register.gif";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./../../../firebase/Firebasestore";
import SuccessAlert from "../../SuccessAlert/SuccessAlert";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  // Scrolling Bug Fixed
  window.scroll({ top: 0 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // console.log(email + " " + password);
  const handleRegister = async () => {
    try {
      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAlertSeverity("success");
      setAlertMessage("Register successfully");
      setOpenAlert(true);
      setTimeout(() => {
        navigate("/login");
        setEmail("");
        setPassword("");
      }, 400);

      // console.log(register);
    } catch (error) {
      setAlertSeverity("error");
      switch (error.code) {
        case "auth/invalid-email":
          setAlertMessage("Invalid email address");
          break;
        case "auth/user-disabled":
          setAlertMessage("User account is disabled");
          break;
        case "auth/email-already-in-use":
          setAlertMessage("user found with this email");
          break;
        case "auth/weak-password":
          setAlertMessage("Password is weak");
          break;
        default:
          setAlertMessage("An unknown error occurred");
      }
      setOpenAlert(true);
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
              {/* Animation */}
              <div className="col hidden md:flex items-center justify-center">
                <img
                  className="lg:max-h-80 max-h-[17rem]"
                  src={animationRegister}
                  alt="login"
                />
              </div>
              {/* Form */}
              <div className="flex md:justify-start justify-center">
                <div className="flex items-center max-w-[26rem] p-4 h-80">
                  <div className="lg:space-y-10 md:space-y-8 space-y-10">
                    {/* Form Title */}
                    <h3 className="text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl">
                      Register
                    </h3>
                    <div className="text-center lg:space-y-7 md:space-y-6 space-y-7 ">
                      <TextField
                        label="Name"
                        size="small"
                        fullWidth
                        color="success"
                        variant="outlined"
                      />
                      {/* Email */}
                      <TextField
                        value={email}
                        label="Email"
                        size="small"
                        fullWidth
                        color="success"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      {/* Password */}
                      <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        size="small"
                        color="success"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        variant="outlined"
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
                      {/* Submit-btn */}
                      <Button
                        sx={{ textTransform: "capitalize" }}
                        type="submit"
                        color="success"
                        variant="contained"
                        onClick={handleRegister}
                      >
                        Register
                      </Button>
                      <p>
                        Already have an account?{" "}
                        <span
                          className="text-green-700 cursor-pointer"
                          onClick={() => navigate("/login")}
                        >
                          Sign In
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

export default Register;
