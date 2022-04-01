import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import BirdCard from './BirdCard';
import ParkCard from './ParkCard';



function eBirdLookup(props) {

  const {apiBase, refreshParksAndBirds, parks} = useContext(DataContext);


  return (
    <div>
      
    </div>
  );
}

export default eBirdLookup;