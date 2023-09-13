import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import AES from 'crypto-js/aes';

import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import studentData from './assets/studentID_66.json';

import dotenv from 'dotenv';
dotenv.config();

const APIURL = process.env.REACT_APP_API_URL;
const KEYS = process.env.REACT_APP_SECRET;

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      setIsShaking(true);
    } else {
      setIsShaking(false);
    }

    const userExists = studentData.some(student => student.id === inputValue);
    setUserExists(userExists);

    if (userExists) {
      try {

        setIsLoading(true); 

        const response = await axios.get(`${APIURL}?studentID=${inputValue}`);

        setIsLoading(false);

        if (response.status === 200) {
          console.log('Request succeeded');

          console.log(response.data);

          const encryptedData = AES.encrypt(JSON.stringify(response.data), `${KEYS}`).toString();
          
          localStorage.setItem('encryptedData', encryptedData);

          setShowResponse(true);

          if (response.data.statusCode === 400) {
            setMessage('อย่าโลภมากน้อง สุ่มครั้งเดียวพอ');
          } else {
            navigate(`/random/:${SHA256(encryptedData).toString()}`);
          }

        } else {
          console.error('Request failed with status code:', response.status);
        }
      } catch (error) {
        console.error('Request error:', error);
      }
    } else if (!userExists && !isInputEmpty){
      setMessage('หารหัสนักศึกษาไม่เจอ ทักแชทไลน์มาเลยจร้า');
    }

    setSubmittedValue(inputValue);
    setIsInputEmpty(false);
  };

  return (
    <div className="input-container">
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column">
        <TextField
          id="outlined-basic"
          label="รหัสนักศึกษารุ่น 66"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="รหัสนักศึกษา ..."
          className={`inputField ${isShaking ? 'shake' : ''}`}
          />
        <Button variant="contained" type="submit" className="button" disabled={isInputEmpty}>
          ตามหาพี่รหัสกันเถอะ
        </Button>
        {isLoading && (
          <div className="loading-overlay">
            <CircularProgress />
          </div>
        )}
        {message && <p style={{ color: 'red', animation: 'shake 0.5s' }}>{message}</p>}
      </Stack>
    </form>
    <div className='About'>
      <p>https://github.com/T0b1e/randomPeeRaHad</p>
      <p>https://discord.gg/x9wkTWdb</p>
    </div>
  </div>
  );
}

export default App;
