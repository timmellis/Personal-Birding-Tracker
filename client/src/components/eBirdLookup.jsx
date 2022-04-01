import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import axios from 'axios';
const eBirdData = require('../resources/ebird_taxonomy_v2.json')


function EBirdLookup({query, ebirdCode, setEbirdCode}) {

  const {apiBase, refreshParksAndBirds, parks} = useContext(DataContext);

  // console.log(eBirdData[0]);

  const ebirdDataFilter = eBirdData.filter(
    (b) => b.common_name.toLowerCase().includes(query.toLowerCase())
  );
  

  if (query.trim().length) {

    return (
      
      <div className='ebird-data-filter-wrapper'>
      
        <div className='ebird-data-filter-message'>{ebirdDataFilter.length} results:
        <br />(click to add)</div>

        <div className='ebird-lookup-table'>
          { ebirdDataFilter.length < 500 ? 
            ebirdDataFilter.map((r,i) => (
              <div className='ebird-data-filter-row' onClick={() => setEbirdCode({name: r.common_name, code: r.species_code})}>{r.common_name} | Code: {r.species_code}</div>
              ))
              :
              <span className='ebird-data-filter-message'>...too many results to display</span>
            }
        </div>
      </div>  
    );
  } else {
    return (
      <div className='ebird-data-filter-wrapper'> 
        <span className='ebird-data-filter-message'>Waiting for search query...</span>
      </div>
    )
  }
}

export default EBirdLookup;