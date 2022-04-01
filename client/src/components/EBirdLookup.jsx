import React, { useContext } from 'react';
import { DataContext } from '../DataContext'
import ebird_taxonomy_v2 from '../resources' 

function eBirdLookup(props) {

  const {apiBase, refreshParksAndBirds, parks} = useContext(DataContext);


  return (
    <div>
      This is the eBird List
    </div>
  );
}

export default eBirdLookup;