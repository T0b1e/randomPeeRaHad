import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SHA256 } from 'crypto-js';

function Random() {
  const { studentID } = useParams();

  const [unhashedData, setUnhashedData] = useState(null);

  useEffect(() => {
    const unhashed = SHA256(studentID).toString(); // TODO

    setUnhashedData(unhashed);
  }, [studentID]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50vh', transform: 'translateY(-50%)' }}>
      <p>Unhashed Data: {unhashedData}</p>
    </div>
  );
}

export default Random;