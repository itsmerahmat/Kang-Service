import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update the user state in the parent (App) component
      setUser(data.user);

      // Show success message and navigate based on the role
      Swal.fire({
        icon: "success",
        title: "Login Successful",
      }).then(() => {
        if (data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
