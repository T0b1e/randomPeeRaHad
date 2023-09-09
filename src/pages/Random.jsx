import { useEffect, useState, useRef } from 'react';
import { AES, enc } from 'crypto-js';
import ReactCardFlip from 'react-card-flip';
import { BsDownload } from 'react-icons/Bs';

import './Card.css';

function Random() {
  const [originData, setOriginData] = useState('');
  const [decryptedDataArray, setDecryptedData] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);

  useEffect(() => {
    const storedData = localStorage.getItem('encryptedData');

    setOriginData(storedData);

    if (storedData) {
      try {
        const bytes = AES.decrypt(storedData, 'yourMomFatAssBitch');
        const decryptedText = bytes.toString(enc.Utf8);
        const decryptedData = JSON.parse(decryptedText);
        setDecryptedData(['พืชตระกูลกะเพรา,163', 'https://drive.google.com/open?id=1ynwpMfTVrSiW8QBb-E_1jKAGdDrcEpCB', 'หาให้เจอน้าา'])
        setDecryptedData(decryptedData);
        setImageURL(decryptedData[0][1]);
      } catch (error) {
        setDecryptedData({ bytes: ['No header text available'] });
      }
    } else {
      setDecryptedData({ bytes: ['No data found in local storage'] });
    }
  }, []);

  const handleFlipClick = () => {
    setIsCardFlipped(!isCardFlipped);
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
        <div ref={frontCardRef} className="card-container">
          <div className="card-front">
            {renderCardContent()}
          </div>
        </div>

        <div ref={backCardRef} className="card-container">
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

      {/*
      <button className="save-button" onClick={handleSaveImages} style={{ height: '50px', position: 'fixed', bottom: '20px', right: '20px' }}>
        Save Pictures <BsDownload />
      </button>
       */}
      
    </div>
  );
}

export default Random;
