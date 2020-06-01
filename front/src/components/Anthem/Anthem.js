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
        if (res.status === 200) {
          setAnthemUrl('https://open.spotify.com/embed/track/' + res.data.id);
          setAnthemName(res.data.name);
          setAnthemArtists(res.data.artists);
          setAnthemImage(res.data.image[0].url);
          setIsLoading(false);
        }
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
          <div className="anthem--container">
            <div className="anthem--banner">Today's Anthem</div>
            <img src={anthemImage} />
            <iframe
              src={anthemUrl}
              width="80"
              height="80"
              frameBorder="0"
              allowtransparency="true"
              allow="encrypted-media">
              title="Spotify player"
            </iframe>
          </div>
          </div>
      )}
    </div>
  );
}

export default Anthem;
