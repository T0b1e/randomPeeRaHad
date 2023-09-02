import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { SHA256 } from 'crypto-js';

import './App.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import studentData from './assets/studentID_66.json';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      setIsInputEmpty(true);
      return;
    }

    const userExists = studentData.some(student => student.id === inputValue);
    setUserExists(userExists);

    if (userExists) {
      try {
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbyI4QZkg1XI77TTzhVdUfL7ngHRg5uAEMMeTKbiICoYvZaUECT45Kf6JMMe7s9HhUuA/exec?studentID=${inputValue}`);

        if (response.status === 200) {
          console.log('Request succeeded');

          const hashedData = SHA256(JSON.stringify(response.data)).toString();

          setResponseData(hashedData); 
          setShowResponse(true);

          navigate(`/random/:${hashedData}`);

        } else {
          console.error('Request failed with status code:', response.status);
        }
      } catch (error) {
        console.error('Request error:', error);
      }
    } else {
      console.log("user doesn't exist");
    }

    setSubmittedValue(inputValue);
    setIsInputEmpty(false);
  };


  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} direction="column">
        <TextField
          id="outlined-basic"
          label="รหัสนักศึกษา"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="รหัสนักศึกษา ..."
          className="inputField"
        />
        <Button variant="contained" type="submit" className="button" disabled={isInputEmpty}>
          ตามหาพี่รหัสกันเหอะ
        </Button>
      </Stack>
    </form>
  </div>
  );
}

export default App;
