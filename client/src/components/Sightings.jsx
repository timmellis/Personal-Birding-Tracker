import mongoose from 'mongoose';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { Axios } from 'axios'
import ParkCard from '../components/ParkCard';

function Sightings(props) {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, birds, parks} = useContext(DataContext);

  const [thisBirdsParks, setThisBirdsParks] = useState(parks);
  const [sortedSightings, setSortedSightings] = useState([]);

    const [thisBird, setThisBird] = useState(
    {
      "name": "",
      "species_code": "",
      "keywords": [],
      "sightings": [
        {"timestamp":"",
        "park_id":"",
        "notes":""}
      ],
      "gallery": [
        {"url": "", "note": ""}
      ],
      "img": "",
      "description": "",
      "notes": " ",
    }
  );

  const getThisBird = async(getBirdID) => {
    const bird = await axios.get(`${apiBase}/birds/${getBirdID}`)
    setThisBird(bird.data);
    // console.log(thisPark);
  }

  const filterParks = () => {
    if (thisBird.sightings) {
    const theseParksIds = thisBird.sightings.map(sght => sght.park_id)
    let theseParks = parks.filter(p => theseParksIds.includes(p._id) )
    setThisBirdsParks(theseParks);
    } else return null;
  }

  const sortSightings = () => {
    if (thisBird.sightings) {
      let these = thisBird.sightings;
      these.sort((a,b) => {return a.timestamp < b.timestamp ? -1 : 1});
      // console.log("Sorted?",these);
      setSortedSightings(these);
    }
  }

  useEffect(() => {
    id && getThisBird(id);
  },[id])
  
  useEffect(() => {
    filterParks();
    sortSightings();
    // console.log(thisBird);
  },[thisBird])


  if (id) { return (
    <div className='sightings-component'>
      
      <div className='sightings-sidebyside'>
              
              <div><h3>By Location</h3>

                {thisBirdsParks.map((park, i) => (  
                  <div key={i} >
                    <h4 className='sightings-location-label'>{park.name}</h4>
                    <div className='sighting-notes'> 
                    {
                      thisBird.sightings.filter(sght => sght.park_id === park._id)
                      .map((s, i) => (
                        <div key={i}>
                          <span className='timestamp'>{new Date(s.timestamp).toLocaleString()}</span> 
                          <span className='sighting-note-text'> • {s.notes}</span></div>))
                    } </div>
                  </div>
                ))}
            
              </div>
              <div><h3>By Date</h3>
             
                {sortedSightings.map((s,i) => (
                  <div key={i}>
                    <div key={i} className='sighting-notes'>
                      <span className='timestamp'>{new Date(s.timestamp).toLocaleString()}</span> 
                      | <span className='sighting-location'>{parks.filter(a=>a._id===s.park_id).name}</span>
                      | <span className='sighting-note-text'> {s.notes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>  {/* className='cards-grid secondary-grid' */}     
    </div>
  );}
  else { return (
    <div>Loading...</div>
  )
  }
}

export default Sightings;