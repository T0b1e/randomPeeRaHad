import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AES, enc } from 'crypto-js';

import './Card.css';
import "./FlipTransition.css";

function Random({onClick}) {
  const { studentID } = useParams();
  const [originData, setOriginData] = useState('');
  const [decryptedDataArray, setDecryptedData] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false); 

  useEffect(() => {
    const storedData = localStorage.getItem('encryptedData');

    setOriginData(storedData);

    if (storedData) {
      try {
        const bytes = AES.decrypt(storedData, 'yourMomFatAssBitch');
        const decryptedText = bytes.toString(enc.Utf8);
        const decryptedData = JSON.parse(decryptedText);
        console.log('Decrypted Data:', decryptedData);

        setDecryptedData(decryptedData);
        setImageURL(decryptedData[0][1]);
      } catch (error) {
        console.error('Decryption error:', error);
        setDecryptedData({ bytes: ['No header text available'] });
      }
    } else {
      setDecryptedData({ bytes: ['No data found in local storage'] });
    }
  }, []);

  const handleFlipClick = () => {
    console.log(isCardFlipped)
    setIsCardFlipped(!isCardFlipped); 
  };

  const renderCardContent = () => {
    if (!decryptedDataArray) {
      // Handle the case where decryptedDataArray is null or undefined
      return (
        <div className="no-content">
          No content available
        </div>
      );
    }

    if (imageURL) {
      return (
        <div className="content">
          <img src={decryptedDataArray[0][1].toString().replace('open', 'uc')} alt="Image" className="image" />
          <h5 className="header">{decryptedDataArray[0][0]}</h5>
          <p className="text">{decryptedDataArray[0][2]}</p>
        </div>
      );
    } else if (decryptedDataArray[0][1]) {
      // Render image and header
      return (
        <div className="content">
          <img src={decryptedDataArray[0][1].toString().replace('open', 'uc')} alt="Image" className="image" />
          <h5 className="header">{decryptedDataArray[0][0]}</h5>
        </div>
      );
    } else if (decryptedDataArray[0][0]) {
      // Render header only
      return (
        <div className="header-only">
          {decryptedDataArray[0][0]}
        </div>
      );
    } else {
      // Render a default message
      return (
        <div className="no-content">
          No content available
        </div>
      );
    }
  };

  return (
    <div>
      <div className="card-container">
        <div className="card" onClick={onClick}>
          <div className="card-front">
            {renderCardContent()}
          </div>
          <div className="card-back">
            <h3 className='lottery'>Number Card: {decryptedDataArray && decryptedDataArray[1]}</h3>
            <div className='footer'>
              <p className='credit'>CPE 65</p>
            </div>
          </div>
        </div>
      </div>
      <button className="flip-button" onClick={handleFlipClick}>Flip Card</button> 
    </div>
  );
}

export default Random;
