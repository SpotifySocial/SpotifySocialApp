import React, { useState, useEffect} from 'react';
import axios from 'axios';

import './Anthem.scss';

export const Anthem = () => {

  const [ anthemUrl, setAnthemUrl] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/get/anthem', {withCredentials: true})
      .then(res => {
        setAnthemUrl(res.data.url);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
      })
  }, [anthemUrl])

  return (
    <div className="anthem">
      { isLoading ? (
        'Loading Your Anthem...'
      ) : (
        <div className="anthem--song--container">
          <iframe
            className="anthem--player"
            src="https://open.spotify.com/embed/track/4qO03RMQm88DdpTJcxlglY"
            width="420"
            height="509"
            frameBorder="0"
            allowtransparency="true"
            allow="encrypted-media">
            title="Spotify player"
          </iframe>
        </div>
      )}
    </div>
  );
}

export default Anthem;
