import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase-connection";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import avatar from "./image/avatar.png";
import "./Login.css";
import logo from "./image/sonoscapelogo.png"

const theme = createTheme();


const Login = () => {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("admin@123");
  const Navigate = useNavigate();
  const [error, setError] = useState(null);

    console.log(email);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    Navigate("/dashboard", { replace: true })
    
    } catch (error) {
        setError("Invalid Username and Password");
    }
  };

  return (
    <div className="mainsec">
        
         <ThemeProvider theme={theme}>
      
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{  }}>
      
        <form onSubmit={handleLogin}>
        <img src={logo} alt="SonoScape" className="logoimg"/>
        <img src={avatar} alt="Custom Avatar" className="avatarimg"/>  
        <h2 >Login</h2>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoFocus
            style={{ marginTop: "10px", marginBottom: "20px" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            style={{ marginTop: "10px", marginBottom: "20px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onMouseDown={handleMouseDownPassword}
                    onClick={handlePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained"  fullWidth style={{ marginTop: "10px", marginBottom: "20px", backgroundColor: "rgb(40, 143, 143)" }}>
            Login
          </Button>
          {error && <p style={{color: "#ed1919"}}>{error}</p>}
        </form>
      </div>
    </div>
    </ThemeProvider>
    </div>
  );
};

export default Login;
