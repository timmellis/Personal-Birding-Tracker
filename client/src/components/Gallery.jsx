import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'

function Gallery(props) {

  const [thisGallery, setThisGallery] = useState([{url: "", note: ""}]);

  useEffect(() => {
    setThisGallery(props.gallery);
  }, [])

  if (thisGallery && thisGallery.length) {
    return (
      <div className='gallery-component'>

        <h4>Gallery</h4>
        
        {(thisGallery.length >= 1 && thisGallery[0].url) && 
          thisGallery.map((item, i) => (
            <div className='gallery-item' key={i}>
              <img className='gallery-img' src={item.url} alt={item.note} />
              <p className='gallery-item-caption'>{item.note}</p>
            </div>
          ))
        }
        {(!thisGallery.length || !thisGallery[0].url) && 
          <div className='gallery-item'>
            <span className='details-message'>To add an image,<br />click 'edit details'</span>
          </div>
        }
      </div>
    );
  } else {
    return (
      <div className='gallery-component'>
        Loading...</div>
    )
  }
}

export default Gallery;