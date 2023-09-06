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
  const [showResponse, setShowResponse] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setMessage('');
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

        const response = await axios.get(`https://script.google.com/macros/s/AKfycbz9njkuB_G8W5H8--y69fAvUDB0JtN8UzzjUlYyp8NypRS_ECHA9HANlvP9KUKFXuet/exec?studentID=${6600014}`);

        if (response.status === 200) {
          console.log('Request succeeded');

          console.log(response.data);

          const encryptedData = AES.encrypt(JSON.stringify(response.data), 'yourMomFatAssBitch').toString();

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
    } else {
      console.log("user doesn't exist");
    }

    setSubmittedValue(inputValue);
    setIsInputEmpty(false);
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    


  <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
  <div className="flip-card-inner">
    <div className="flip-card-front">
      {/* Content for the front of the card */}
    </div>
    <div className="flip-card-back">
      {/* Content for the back of the card */}
    </div>
  </div>
  <button onClick={handleFlip}>Flip</button>
</div>

  );
}

export default App;
