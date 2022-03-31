// SYSTEM IMPORTS
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

// IMPORT PAGES AND COMPONENTS
import ParkCard from '../components/ParkCard'
import Gallery from '../components/Gallery'


// REACT FUNCTION:
const BirdDetails = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, parks, birds, searchParams} = useContext(DataContext);

  const [thisBird, setThisBird] = useState({});
  const [thisBirdsParks, setThisBirdsParks] = useState(parks);

  // useEffect(() => {
  //   filterParks();
  //   // console.log('PARK DETAILS SERCH PARAM:', searchParams);
  // }, [thisBird])

  useEffect(() => {
    getThisBird();
  },[])
  useEffect(() => {
    filterParks();
  },[thisBird])


  const getThisBird = async() => {
    const bird = await axios.get(`${apiBase}/birds/${id}`)
    setThisBird(bird.data);
    // console.log(thisPark);
  }     


  const filterParks = () => {
    if (thisBird.sightings) {
    const theseParksIds = thisBird.sightings.map(sght => sght.park_id)
    let theseParks = parks.filter(p => theseParksIds.includes(p._id) )
    console.log("THESE PARKS:", theseParksIds, theseParks);
    setThisBirdsParks(theseParks);
    } else return null;
  }

  function showPark(id) {
    console.log("parkID = ", id);
    navigate(`/explore/parks/${id}`); 
  } 

  if (birds.length && thisBird && thisBird.gallery) {
    return (
      <div className='details-page-wrapper'>
        <div className='page-title bird-details-title'>
          <h2>Details for<br />{thisBird.name}</h2>
          <h5>{thisBird.species_code}</h5>
        </div> 
        <div className='details-content-wrapper'>
          <div className='details-content'>
            <div className='details-block'>
              <img className='bird-details-feature-img' src={thisBird.img} alt='feature' />
              {/* {(searchParams) && <span>Saved</span>} */}
              <button className='edit-details-link'><Link to={`/modify/birds/update/${id}`}> ✎ Edit details  </Link></button>
              <button className='delete-link'><Link to={`/modify/birds/delete/${id}`}> <b>✗</b> Delete </Link></button>

              <p>{thisBird.description}</p>
              <p>Notes:<br /> {thisBird.notes}</p>
            </div>
            <h3>Sightings:</h3>
            <div className='cards-grid secondary-grid'>
            {thisBirdsParks.map((park, i) => (  
              <div key={i} className='secondary-grid-card-block'>
                <ParkCard key={i} park={park} onClick={() => showPark(park._id)} />
                <div className='sighting-notes'> 
                {
                  thisBird.sightings.filter(sght => sght.park_id === park._id)
                  .map((s, i) => (
                    <div key={i}>
                      <span className='timestamp'>{Date(s.timestamp)}:</span><br /><span className='sighting-note-text'> • {s.notes}</span></div>))
                } </div>
              </div>
            ))}
            
            </div>  {/* className='cards-grid secondary-grid' */}
          </div> {/* className='details-content' */}
          
            <div className='details-gallery'> 
            <Gallery gallery={thisBird.gallery} />
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
  
export default BirdDetails;