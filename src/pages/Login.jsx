import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import "../styles/form.css";

const URL = 'https://66604f675425580055b345d8.mockapi.io/user';


const FormLogin = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
      const res = await axios.get(`${URL}`);
      if (res.status === 200) {
          setUser(res.data);
      }
  }

  useEffect(() => {
      fetchUser();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.post(`${URL}`, {
              username,
              password,
          });

          localStorage.setItem('token', response.data.token);
          navigate('/course');
      } catch (error) {
          console.error('Login Error:', error);
      }
  };


  return (
    <div className="container">
      <div className="form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <button type= "submit" className="form-button">Sign in</button>
          <button id = "b2" type= "submit" className="form-button"><i className="fa-brands fa-google" /> Login by Google</button>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
