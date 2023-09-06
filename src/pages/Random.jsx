import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsDownload } from 'react-icons/Bs';
import { AES, enc } from 'crypto-js';
import ReactCardFlip from "react-card-flip";

import './Card.css';
import html2canvas from 'html2canvas';

function Random() {
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
    console.log('isCardFlipped:', isCardFlipped);
    setIsCardFlipped(!isCardFlipped);
  };

  const handleSaveClick = () => {
    const cardElement = document.querySelector('.card-container'); 
  
    html2canvas(cardElement).then((canvas) => {
      const imageDataURL = canvas.toDataURL('image/png');
  
      const link = document.createElement('a');
      link.href = imageDataURL;
      link.download = 'card.png';
      link.click();
    });
  };

  const renderCardContent = () => {
    if (!decryptedDataArray) {
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
      return (
        <div className="content">
          <img src={decryptedDataArray[0][1].toString().replace('open', 'uc')} alt="Image" className="image" />
          <h5 className="header">{decryptedDataArray[0][0]}</h5>
        </div>
      );
    } else if (decryptedDataArray[0][0]) {
      return (
        <div className="header-only">
          {decryptedDataArray[0][0]}
        </div>
      );
    } else {
      return (
        <div className="no-content">
          No content available
        </div>
      );
    }
  };

  return (
    <div>
    <ReactCardFlip isFlipped={isCardFlipped} flipDirection="horizontal">
    <div className="card-container">
      <div className="card-front">
        {renderCardContent()}
      </div>
    </div>

    <div className="card-container">
      <div className="card-back">
        <h3 className="lottery">Number Card: {decryptedDataArray && decryptedDataArray[1]}</h3>
        <div className="footer">
          <p className="credit">CPE 64-65</p>
        </div>
      </div>
    </div>
  </ReactCardFlip>

    <button className="flip-button" onClick={handleFlipClick}>
      Flip Card
    </button>

      <button className="save-button" onClick={handleSaveClick} style={{ height: '50px', position: 'fixed', bottom: '20px', right: '20px' }}>
        Save Picture <BsDownload />
      </button>
    </div>
  );
}

export default Random;
