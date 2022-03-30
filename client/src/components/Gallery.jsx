import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'

function Gallery(props) {

  const [thisGallery, setThisGallery] = useState([]);

  useEffect(() => {
    setThisGallery(props.gallery);
  }, [])

  if (thisGallery.length) {
    return (
      <div className='gallery-component'>
        <h4>Park Gallery</h4>
        {thisGallery.map((item, i) => (
          <div className='gallery-item' key={i}>
            <img className='gallery-img' src={item.url} alt={item.note} />
            <p className='gallery-item-caption'>{item.note}</p>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default Gallery;