import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

function Random() {
  const { studentID } = useParams();
  const [decryptedDataArray, setDecryptedData] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    // Try to retrieve encrypted data from local storage
    const storedData = localStorage.getItem('encryptedData');

    if (storedData) {
      try {
        const bytes = AES.decrypt(storedData, 'yourMomFatAssBitch');

        const decryptedText = bytes.toString(enc.Utf8);

        const decryptedData = JSON.parse(decryptedText);
        setDecryptedData(decryptedData);

        console.log(decryptedData, decryptedData[1].toString().replace('open', 'uc'));
        setImageURL(decryptedData[1]);

      } catch (error) {
        console.error('Decryption error:', error);
        setDecryptedData({ bytes: ['No header text available'] });
      }
    } else {
      // Handle the case where no data is found in local storage
      setDecryptedData({ bytes: ['No data found in local storage'] });
    }
  }, []);

  const typographyStyle = {
    fontFamily: 'Kanit, sans-serif', // Set the font family to Kanit
  };

  const renderCardContent = () => {
    if (!decryptedDataArray) {
      // Handle the case where decryptedDataArray is null or undefined
      return (
        <Typography variant="h3" component="div" align="center" style={typographyStyle}>
          No content available
        </Typography>
      );
    }

    if (imageURL) {
      // Render image, header, and small text
      return (
        <div>
          <img src={decryptedDataArray[1].toString().replace('open', 'uc')} alt="Image" style={{ maxWidth: '100%' }} />
          <Typography variant="h5" component="div" gutterBottom style={typographyStyle}>
            {decryptedDataArray[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={typographyStyle}>
            {decryptedDataArray[2]}
          </Typography>
        </div>
      );
    } else if (decryptedDataArray[1]) {
      // Render image and header
      return (
        <div>
          <img src={decryptedDataArray[1].toString().replace('open', 'uc')} alt="Image" style={{ maxWidth: '100%' }} />
          <Typography variant="h5" component="div" gutterBottom style={typographyStyle}>
            {decryptedDataArray[0]}
          </Typography>
        </div>
      );
    } else if (decryptedDataArray[0]) {
      // Render header only
      return (
        <Typography variant="h3" component="div" align="center" style={typographyStyle}>
          {decryptedDataArray[0]}
        </Typography>
      );
    } else {
      // Render a default message
      return (
        <Typography variant="h3" component="div" align="center" style={typographyStyle}>
          No content available
        </Typography>
      );
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ display: 'block', width: '300px', transitionDuration: '0.3s', height: '450px' }}>
        <CardContent>{renderCardContent()}</CardContent>
      </Card>
    </div>
  );
}

export default Random;
