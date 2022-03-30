// SYSTEM IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

// IMPORT PAGES AND COMPONENTS
import BirdCard from '../components/BirdCard'
import Gallery from '../components/Gallery'


// REACT FUNCTION:
const ParkDetails = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, parks, birds, searchParams} = useContext(DataContext);

  const [thisPark, setThisPark] = useState({});
  const [thisParksBirds, setThisParksBirds] = useState(birds);

  useEffect(() => {
    getThisPark();
    filterBirds();
    // console.log('PARK DETAILS SERCH PARAM:', searchParams);
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
    // console.log("THESE BIRDS:", theseBirds);
    setThisParksBirds(theseBirds);
  }

  function showBird(id) {
    console.log("birdID = ", id);
    navigate(`/explore/birds/${id}`); 
  } 

  if (parks.length) {
    return (
      <div className='details-page-wrapper'>
        <div className='page-title' style={{backgroundImage: `url(${thisPark.img})`}}>
          <h2>Park Details for<br />{thisPark.name}</h2>
          <h5>{thisPark.location}</h5>
        </div> 
        <div className='details-content-wrapper'>
          <div className='details-content'>
            <div className='details-block'>
              {/* {(searchParams) && <span>Saved</span>} */}
              <button className='edit-details-link'><Link to={`/modify/parks/update/${id}`}> ✎ Edit details  </Link></button>
              <button className='delete-link'><Link to={`/modify/parks/delete/${id}`}> <b>✗</b> Delete </Link></button>
              <p>Address: {thisPark.address}</p>
              <p>{thisPark.description}</p>
              <p>Notes:<br /> {thisPark.notes}</p>
            </div>
            <h3>Seen at this location:</h3>
            <div className='cards-grid secondary-grid'>
            {thisParksBirds.map((bird, i) => (  
              <div key={i} className='secondary-grid-card-block'>
                <BirdCard key={i} bird={bird} onClick={() => showBird(bird._id)} />
                <div className='sighting-notes'>Notes: 
                {
                  bird.sightings.filter(sght => sght.park_id === id)
                  .map((s, i) => (
                    <div key={i}>
                      <span className='timestamp'>{Date(s.timestamp)}:</span><br /><span className='sighting-note-text'>{s.notes}</span></div>))
                } </div>
              </div>
            ))}
            </div>  {/* className='cards-grid secondary-grid' */}
          </div> {/* className='details-content' */}
          <div className='details-gallery'>
          <Gallery gallery={thisPark.gallery} />
          </div>
        </div> {/* className='details-content-wrapper' */}
      </div> // className='details-page-wrapper'
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