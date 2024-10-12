import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { username, password });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response.data.message,
      });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
