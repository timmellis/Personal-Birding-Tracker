import mongoose from 'mongoose';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { Axios } from 'axios'
import ParkCard from '../../components/ParkCard';
import Sightings from '../../components/Sightings';

function NewSighting(props) {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, refreshParksAndBirds, birds, parks} = useContext(DataContext);
  
  const [newSightingBirdID, setNewSightingBirdID] = useState("");
  const [thisBirdsParks, setThisBirdsParks] = useState(parks);

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
  const [newSighting, setNewSighting] = useState(
    {
      "timestamp":"",
      "park_id":"",
      "notes":""
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

  useEffect(() => {
    id && getThisBird(id);
  },[id])
  
  useEffect(() => {
    newSightingBirdID && getThisBird(newSightingBirdID);
  },[newSightingBirdID])
  
  useEffect(() => {
    filterParks();
    console.log(thisBird);
  },[thisBird])

  const onChange = (e, i) => {
    // console.log(e, thisBird);
    if (e.target.id === 'park_id') setNewSighting({...newSighting, park_id: e.target.value});
    else if (e.target.id === 'bird_id') {
      setNewSightingBirdID(e.target.value);
      //console.log(thisBird.species_code);
    }
    else if (e.target.id === 'timestamp') {
      setNewSighting({...newSighting, timestamp: e.target.value});
      //console.log(thisBird.species_code);
    }
    else if (e.target.id === 'notes') {
      setNewSighting({...newSighting, notes: e.target.value});
      //console.log(thisBird.species_code);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const update_id = id ? id : newSightingBirdID;
    const updateUrl = `${apiBase}/birds/update/${update_id}`;
    
    thisBird.sightings.push(newSighting);

    console.log(thisBird);
        await axios.put(updateUrl, thisBird)
    .then(res => {
      console.log(res);
      navigate(`/explore/birds/${update_id}?status=newsighting`);
    })
  }



  return (
    <div>

      <div className='new-sighting-wrapper'>

        {(!id || !thisBird.name) 
        ?
         <h3>Report a New Sighting:</h3>
        :
         <h3>Report a New Sighting for: {thisBird.name}</h3>
        }

        <div className='update-form-wrapper'>
          <form className='update-form new-sighting-form' onSubmit={(e) => onSubmit(e)}>

            
            {!id &&
              <label htmlFor='bird_id'>Bird* </label>
            }
            {!id && 
              <div>
                <select name='bird_id' id='bird_id' onChange={(e) => onChange(e)}>
                  <option name='prompt-option' selected disabled> -- Select a Bird -- </option>
                  {birds.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                </select> 
                <br />{newSightingBirdID ? newSightingBirdID : 'empty'}
              </div>
            }

            <label htmlFor='park_id'>Location* </label>
            <div>
              <select name='park_id' id='park_id' onChange={(e) => onChange(e)}>
                <option name='prompt-option' selected disabled> -- select a location -- </option>
                {parks.map((p) => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
              </select> 
              <br />{newSighting.park_id ? newSighting.park_id : 'empty'}
            </div>
            
            <label htmlFor='timestamp'>Timestamp* </label>
            <div>
              <input type='datetime-local' name='timestamp' id='timestamp' value={newSighting.timestamp} onChange={(e) => onChange(e)} />

              {/* EXPERIMENTING */}
              <input type='text' disabled value={
                new Date(newSighting.timestamp).toLocaleString()
                } />
            </div>

            <label htmlFor='notes'>Notes </label>
            <textarea rows='2' type='text' name='notes' id='notes' value={newSighting.notes} onChange={(e) => onChange(e)}></textarea>

            <br />
            <div>
              <button type='submit' disabled={!newSighting.park_id || !newSighting.timestamp}>Submit</button>
              <button type='button' onClick={() => navigate('/explore/birds')}>Cancel</button>

            </div>
          </form>
        </div>
      </div>


{/* IF BIRD_ID && THERE ARE PREVIOUS SIGHTINGS FOR THIS BIRD: */}
      {id ? 
        <div>
          <h4>Previous Sightings</h4>
          <Sightings />
        </div>
      :
        <div></div>
    }
    </div>
  );
}

export default NewSighting;