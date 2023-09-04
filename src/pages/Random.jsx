import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import axios from 'axios';

import './card.css';

function Random() {
  const { studentID } = useParams();
  const [decryptedDataArray, setDecryptedData] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('encryptedData');

    if (storedData) {
      try {
        const bytes = AES.decrypt(storedData, 'yourMomFatAssBitch');
        const decryptedText = bytes.toString(enc.Utf8);
        const decryptedData = JSON.parse(decryptedText);
        setDecryptedData(decryptedData);
        setImageURL(decryptedData[1]);
      } catch (error) {
        console.error('Decryption error:', error);
        setDecryptedData({ bytes: ['No header text available'] });
      }
    } else {
      setDecryptedData({ bytes: ['No data found in local storage'] });
    }
  }, []);

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
      // Render image, header, and small text
      return (
        <div className="content">
          <img src={decryptedDataArray[1].toString().replace('open', 'uc')} alt="Image" className="image" />
          <h5 className="header">{decryptedDataArray[0]}</h5>
          <p className="text">{decryptedDataArray[2]}</p>
        </div>
      );
    } else if (decryptedDataArray[1]) {
      // Render image and header
      return (
        <div className="content">
          <img src={decryptedDataArray[1].toString().replace('open', 'uc')} alt="Image" className="image" />
          <h5 className="header">{decryptedDataArray[0]}</h5>
        </div>
      );
    } else if (decryptedDataArray[0]) {
      // Render header only
      return (
        <div className="header-only">
          {decryptedDataArray[0]}
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
    <div className="container">
      <div className="card">
        {renderCardContent()}
      </div>
    </div>
  );
}

export default Random;
