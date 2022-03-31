import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { useNavigate } from 'react-router-dom'

import BirdCard from '../components/BirdCard'

const ExploreBirds = (props) => {

  let navigate = useNavigate();

  const {birds} = useContext(DataContext);

  function showBird(id) {
    console.log(id);
    navigate(`${id}`);
  } 
  console.log("CHECKMARK");
  if (birds.length) {
    return (
      <div>
        <h2>Explore Birds page</h2>
        
        <div className='cards-grid'>
        {birds.map((b, i) => (  
          <BirdCard key={i} bird={b} onClick={() => showBird(b._id)} />
        ))}
        </div>

      </div>
    );
  } else {
    return (
      <div className="loading">
        Loading...
      </div>
    )
  }
};
  
export default ExploreBirds;