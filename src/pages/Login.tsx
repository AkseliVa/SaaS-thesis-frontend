import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (u: string, p: string) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });

    if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("adminId", data.adminId.toString());
            localStorage.setItem("companyId", data.companyId.toString());
            navigate("/dashboard");
            onLogin?.();
        } else {
            alert("Login failed");
        }
    };

    const handleSignup = async () => {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername, password: newPassword, role: "ADMIN", companyName: companyName })
      });

      if (response.ok) {
        await handleLogin(newUsername, newPassword);
      } else {
          alert("Sign-up failed");
      }
    };

  return (
    <div style={{justifyContent: "center", alignItems: "center", display: "flex", padding: 20}}>
      <div id="login-container" style={{flex: 1, padding: 20, margin: 30}}>
        <Typography variant="h1">Login</Typography>
        <TextField
        sx={{
          backgroundColor: "white",
          borderRadius: 1
        }}
          fullWidth
          margin="dense"
          required
          label="Username"
          name="username"
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: 1
          }}
          fullWidth
          margin="dense"
          required
          label="Password"
          name="password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Button sx={{marginTop: 5}} variant="contained" onClick={() => handleLogin(username, password)}>Login</Button>
      </div>
      <div id="signup-container" style={{padding: 20, margin: 30, flex: 1}}>
        <Typography variant="h1">Sign-up</Typography>
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: 1
          }}
          fullWidth
          margin="dense"
          required
          label="Username"
          name="newUsername"
          onChange={e => setNewUsername(e.target.value)}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: 1
          }}
          fullWidth
          margin="dense"
          required
          label="Password"
          name="newPassword"
          type="password"
          onChange={e => setNewPassword(e.target.value)}
        />
        <TextField
          sx={{
            backgroundColor: "white",
            borderRadius: 1
          }}
          fullWidth
          margin="dense"
          required
          label="Company name"
          name="company"
          onChange={e => setCompanyName(e.target.value)}
        />
        <Button sx={{marginTop: 5}} variant="contained" onClick={handleSignup}>Sign-up</Button>
      </div>
    </div>
  );
}

export default Login;
