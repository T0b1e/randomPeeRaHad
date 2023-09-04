import { useEffect, useState } from 'react';
import { google } from 'googleapis';
import axios from 'axios';

// Replace with your own client ID and client secret from the Google Developers Console
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

function GoogleDriveImage({ fileId }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const auth = new google.auth.OAuth2(
          CLIENT_ID,
          CLIENT_SECRET,
          'http://localhost' // This is your redirect URL for development
        );

        // Generate an authentication URL
        const authUrl = auth.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
        });

        // Open a new window to allow the user to sign in with Google
        const authWindow = window.open(authUrl, '_blank');

        // Wait for the user to complete authentication
        await new Promise((resolve) => {
          const checkAuth = () => {
            if (authWindow.closed) {
              resolve();
            } else {
              setTimeout(checkAuth, 100);
            }
          };
          checkAuth();
        });

        // Exchange the authorization code for an access token
        const { tokens } = await auth.getToken(code);

        // Set the access token for future API requests
        auth.setCredentials(tokens);

        // Fetch the image URL
        const drive = google.drive({ version: 'v3', auth });
        const response = await drive.files.get({
          fileId,
          fields: 'webViewLink',
        });

        // Get the webViewLink from the response
        const { webViewLink } = response.data;

        setImageUrl(webViewLink);
      } catch (error) {
        console.error('Error authenticating:', error);
      }
    };

    authenticate();
  }, [fileId]);

  return (
    <div>
      {imageUrl && (
        <img src={imageUrl} alt="Google Drive Image" />
      )}
    </div>
  );
}

export default GoogleDriveImage;
