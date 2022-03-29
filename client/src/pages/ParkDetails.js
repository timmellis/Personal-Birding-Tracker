import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

import BirdCard from '../components/BirdCard'

const ParkDetails = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, parks, birds} = useContext(DataContext);

  const [thisPark, setThisPark] = useState({});
  const [thisParksBirds, setThisParksBirds] = useState(birds);

  useEffect(() => {
    getThisPark();
    filterBirds();
  },[id])

  const getThisPark = async() => {
    const park = await axios.get(`${apiBase}/parks/${id}`)
    setThisPark(park.data);
    // console.log(thisPark);
  }

  const filterBirds = () => {
    const theseBirds = birds.filter((brd) => 
      brd.sightings.some(sght => sght.park_id === id)
    );
    console.log("THESE BIRDS:", theseBirds);
    setThisParksBirds(theseBirds);
  }

  function showBird(id) {
    console.log("birdID = ", id);
    navigate(`/explore/birds/${id}`);
  } 

  if (parks.length) {
    return (
      <div>
        <div className='page-title' style={{backgroundImage: `url(${thisPark.img})`}}>
          <h2>Park Details for<br />{thisPark.name}</h2>
          <h5>{thisPark.location}</h5>
        </div> 
        <div className='details-block'>
          <p>Address: {thisPark.address}</p>
          <p>{thisPark.description}</p>
          <p>Notes:<br /> {thisPark.notes}</p>
        </div>
        <h3>Seen at this location:</h3>
        <div className='cards-grid secondary-grid'>
        {thisParksBirds.map((bird, i) => (  
          <div className='secondary-grid-card-block'>
            <BirdCard key={i} bird={bird} onClick={() => showBird(bird._id)} />
            <p className='sighting-notes'>Notes: 
            {
              bird.sightings.filter(sght => sght.park_id === id)
              .map((s) => (
                <div>
                  <span className='timestamp'>{Date(s.timestamp)}:</span><br /><span className='sighting-note-text'>{s.notes}</span></div>))
            } </p>
          </div>
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
  
export default ParkDetails;