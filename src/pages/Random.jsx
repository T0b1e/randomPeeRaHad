import { useEffect, useState, useRef } from 'react';
import { AES, enc } from 'crypto-js';
import ReactCardFlip from 'react-card-flip';
import { BsDownload } from 'react-icons/Bs';
import html2canvas from 'html2canvas';

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

  const handleSaveImages = () => {
    // Capture the front card content as an image
    const frontCardElement = frontCardRef.current;

    html2canvas(frontCardElement).then((canvas) => {
      const frontCardImageURL = canvas.toDataURL('image/png');

      // Create download link for the front card image
      const frontCardLink = document.createElement('a');
      frontCardLink.href = frontCardImageURL;
      frontCardLink.download = 'front-card.png';
      frontCardLink.click();
    });

    // Capture the back card content as an image
    const backCardElement = backCardRef.current;

    html2canvas(backCardElement).then((canvas) => {
      const backCardImageURL = canvas.toDataURL('image/png');

      // Create download link for the back card image
      const backCardLink = document.createElement('a');
      backCardLink.href = backCardImageURL;
      backCardLink.download = 'back-card.png';
      backCardLink.click();
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
