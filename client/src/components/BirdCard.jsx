import React, { useContext } from 'react';
import { DataContext } from '../DataContext'

function BirdCard(props) {

  // const {parks} = useContext(DataContext);
  const {name, location, address, description, 
    notes, img, gallery} = props.bird;

  return (
    <div className="card-wrapper bird-card-wrapper" style={{backgroundImage: `url(${img})`}} onClick={props.onClick}>
      <div className="card-title">
        <h3>{name}</h3>
        <h5>{location}</h5>
      </div>
    </div>
  );
}

export default BirdCard;