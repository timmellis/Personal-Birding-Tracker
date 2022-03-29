import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

// import BirdCard from '../components/BirdCard'

const ExploreParks = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, parks, birds} = useContext(DataContext);

  const [thisPark, setThisPark] = useState({});
  const [thisParksBirds, setThisParksBirds] = useState([]);

  useEffect(() => {
    getThisPark();
  },[id])

  const getThisPark = async() => {
    const park = await axios.get(`${apiBase}/parks/${id}`)
    setThisPark(park.data);
    console.log(thisPark);
  }

  const filterBirds = async() => {
    const allBirds = await axios.get(`${apiBase}/birds`)
    setThisParksBirds(allBirds.data);
  }

  function showBird(id) {
    console.log("birdID = ", id);
    navigate(`/explore/birds/${id}`);
  } 

  if (parks.length) {
    return (
      <div>
        <h2>Park Details for {thisPark.name}</h2>
        
        <div className='cards-grid'>
        {/* {thisParksBirds.map((b, i) => (  
          <BirdCard key={i} bird={b} onClick={() => showBird(b._id)} />
        ))} */}
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