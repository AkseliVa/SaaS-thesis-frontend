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
    <div style={{justifyContent: "center", alignItems: "center", display: "flex"}}>
      <div id="login-container">
        <h1>Login</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button onClick={() => handleLogin(username, password)}>Login</button>
      </div>
      <div id="signup-container">
        <h1>Sign-up</h1>
        <input value={newUsername} onChange={e => setNewUsername(e.target.value)} />
        <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="password" />
        <input value={companyName} onChange={e => setCompanyName(e.target.value)}/>
        <button onClick={handleSignup}>Sign-up</button>
      </div>
    </div>
  );
}

export default Login;
