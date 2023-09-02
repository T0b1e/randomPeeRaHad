import { useState } from 'react';
import axios from 'axios';
import studentData from '../assets/studentID_66.json';

function InputField() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [responseData, setResponseData] = useState(null); // New state variable
  const [showResponse, setShowResponse] = useState(false); // New state variable

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') {
      setIsInputEmpty(true);
      return;
    }

    // Check if user exists in studentData before making the Axios request
    const userExists = studentData.some(student => student.id === inputValue);
    setUserExists(userExists);

    if (userExists) {
      try {
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbyI4QZkg1XI77TTzhVdUfL7ngHRg5uAEMMeTKbiICoYvZaUECT45Kf6JMMe7s9HhUuA/exec?studentID=${inputValue}`);

        if (response.status === 200) {
          console.log('Request succeeded');
          console.log(response.data);

          // Set the response data to be displayed
          setResponseData(response.data);
          setShowResponse(true);
          setShowOverlay(true);
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

  const handleOverlayClick = () => {
    // Toggle the showResponse state when the overlay is clicked
    setShowResponse(!showResponse);
  };

  return (
    <div className="input-container">
      {showOverlay && (
        <div className="overlay" onClick={handleOverlayClick}>
          <div className="overlay-text">
            Click anywhere or press Enter to start random
          </div>
          {/* Conditionally render the response data */}
          {showResponse && (
            <div className="response-data">
              {/* You can format and style the responseData as needed */}
              {JSON.stringify(responseData, null, 2)}
            </div>
          )}
        </div>
      )}
      {/* Conditionally render the form or the response */}
      {!showResponse ? (
        <form onSubmit={handleSubmit}>
          <input  
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="รหัสนักศึกษา ..."
            className={isInputEmpty ? 'error-shake' : ''}
          />
          <button type="submit">Finding</button>
        </form>
      ) : null}
    </div>
  );
}

export default InputField;
