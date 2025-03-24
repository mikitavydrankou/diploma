import './App.css';
import axios from 'axios';

const test = async () => {
  try {
    const response = await axios.get('http://localhost:3000/test');
    return response.data;
  } catch (error) {
    console.error('Error fetching test data:', error);
    throw error;
  }
};

export default function App() {

  const handleTest = async () => {
    const data = await test();
    console.log(data);
  };

  return (
    <div className="App">
      <button onClick={handleTest}>Fetch Test Data</button>
      
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input type="text" /><br/>
        <label>Password</label>
        <input type="text" /> <br />
        <button>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username…" /> <br/>
        <input type="password" placeholder="Password…" />
        <button>Login</button>
      </div>
    </div>
  );
} 