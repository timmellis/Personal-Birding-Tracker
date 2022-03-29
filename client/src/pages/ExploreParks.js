import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { useNavigate } from 'react-router-dom'

import ParkCard from '../components/ParkCard'

const ExploreParks = (props) => {

  let navigate = useNavigate();

  const {parks, birds} = useContext(DataContext);

  function showPark(id) {
    console.log(id);
    navigate(`${id}`);
  } 

  if (parks.length) {
    return (
      <div>
        <h2>Explore Parks page</h2>
        
        <div className='cards-grid'>
        {parks.map((p, i) => (  
          <ParkCard key={i} park={p} onClick={() => showPark(p._id)} />
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
  
export default ExploreParks;