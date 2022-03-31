import React, { useContext } from 'react';
import { DataContext } from '../DataContext'

function ParkCard(props) {

  // const {parks} = useContext(DataContext);
  
  const {name, location, img} = props.park;

  return (
    <div className="card-wrapper park-card-wrapper" style={{backgroundImage: `url(${img})`}} onClick={props.onClick}>
      <div className="card-title">
        <h3>{name}</h3>
        {/* <h5>{location}</h5> */}
      </div>
    </div>
  );
}

export default ParkCard;