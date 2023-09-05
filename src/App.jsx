import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { SHA256 } from 'crypto-js';
import AES from 'crypto-js/aes';

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
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbw9F4r7lb6sU4ryWIhmGKgy7_cdFxlf9JuTaji8FHaFAF-_ckgNpNioPaeId3G_9oHW/exec?studentID=${inputValue}`);

        if (response.status === 200) {
          console.log('Request succeeded');

          console.log(response.data)

          const encryptedData = AES.encrypt(JSON.stringify(response.data), 'yourMomFatAssBitch').toString();
  
          localStorage.setItem('encryptedData', encryptedData);
  
          setShowResponse(true);
  
          navigate(`/random/:${SHA256(encryptedData).toString()}`);
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
    <div className="input-container">
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
