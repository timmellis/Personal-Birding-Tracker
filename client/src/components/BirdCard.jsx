import React, { useContext } from 'react';
import { DataContext } from '../DataContext'

function BirdCard(props) {

  // const {parks} = useContext(DataContext);
  const {name, img} = props.bird;
  

  return (
    <div className="card-wrapper bird-card-wrapper" 
      style={img ? {backgroundImage: `url(${img})`} : {}} 
      onClick={props.onClick}
    >
      <div className="card-title">
        <h3>{name}</h3>
        
      </div>
    </div>
  );
}

export default BirdCard;