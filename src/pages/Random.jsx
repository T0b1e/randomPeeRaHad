import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AES, enc } from 'crypto-js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Random() {
  const { studentID } = useParams();
  const [decryptedData, setDecryptedData] = useState(null);

  useEffect(() => {
    // Try to retrieve encrypted data from local storage
    const storedData = localStorage.getItem('encryptedData');

    if (storedData) {
      try {
        // Decrypt the stored data using your secret key
        const bytes = AES.decrypt(storedData, 'yourMomFatAssBitch');

        // Convert the decrypted data to a string
        const decryptedText = bytes.toString(enc.Utf8);

        setDecryptedData(JSON.parse(decryptedText));
      } catch (error) {
        console.error('Decryption error:', error);
        setDecryptedData({ bytes: ['No header text available'] });
      }
    } else {
      // Handle the case where no data is found in local storage
      setDecryptedData({ bytes: ['No data found in local storage'] });
    }
  }, []);
  
  const renderCardContent = () => {
    if (!decryptedData) {
      // Handle the case where decryptedData is null or undefined
      return (
        <Typography variant="h3" component="div" align="center">
          No content available
        </Typography>
      );
    }
  
    if (decryptedData[1] && decryptedData[2]) {
      // Render image, header, and small text
      return (
        <div>
          <img src={decryptedData[1].replace('/open?', '/uc?export&')} alt="Image" style={{ maxWidth: '100%' }} />
          <Typography variant="h5" component="div" gutterBottom>
            {decryptedData[0]}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {decryptedData[2]}
          </Typography>
        </div>
      );
    } else if (decryptedData[1]) {
      // Render image and header
      return (
        <div>
          <img src={decryptedData[1].replace('/open?', '/uc?export&')} alt="Image" style={{ maxWidth: '100%' }} />
          <Typography variant="h5" component="div" gutterBottom>
            {decryptedData[0]}
          </Typography>
        </div>
      );
    } else if (decryptedData[0]) {
      // Render header only
      return (
        <Typography variant="h3" component="div" align="center">
          {decryptedData[0]}
        </Typography>
      );
    } else {
      // Render a default message
      return (
        <Typography variant="h3" component="div" align="center">
          No content available
        </Typography>
      );
    }
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{  display: 'block',
                      width: '300px',
                      transitionDuration: '0.3s',
                      height: '45vw' }}>
        <CardContent>
          {renderCardContent()}
        </CardContent>
      </Card>
    </div>
  );
}

export default Random;
