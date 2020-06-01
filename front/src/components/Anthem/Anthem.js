import React, { useState, useEffect} from 'react';
import axios from 'axios';

import './Anthem.scss';

export const Anthem = () => {

  const [ anthemUrl, setAnthemUrl] = useState('');
  const [ anthemName, setAnthemName] = useState('');
  const [ anthemArtists, setAnthemArtists] = useState([]);
  const [ anthemImage, setAnthemImage] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/get/anthem', {withCredentials: true})
      .then(res => {
        setAnthemUrl(res.data.url);
        setAnthemName(res.data.name);
        setAnthemArtists(res.data.artists);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('error', error);
      })
  }, [])

  return (
    <div>
      { isLoading ? (
        <div className="anthem--loading">Loading Your Anthem...</div>
      ) : (
        <div className="anthem">
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
