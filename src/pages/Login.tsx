import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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

  return (
    <div>
        <h1>Login</h1>
        <input value={username} onChange={e => setUsername(e.target.value)} />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
