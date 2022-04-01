import mongoose from 'mongoose';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { Axios } from 'axios'

function NewSighting(props) {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, refreshParksAndBirds, parks} = useContext(DataContext);
  
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

  const getThisBird = async() => {
    const bird = await axios.get(`${apiBase}/birds/${id}`)
    setThisBird(bird.data);
    // console.log(thisPark);
  }

  useEffect(() => {
    getThisBird();
  },[id])

  const onChange = (e, objKey, i) => {
    // console.log(e, thisBird);
    if (e.target.id === 'name') setThisBird({...thisBird, name: e.target.value});
    else if (e.target.id === 'species_code') setThisBird({...thisBird, species_code: e.target.value});
    else if (e.target.id === 'keywords') {
      setThisBird({...thisBird, keywords: e.target.value.split(",")});
      console.log("Keywords = Array: ", thisBird.keywords);
    }
    else if (e.target.id === 'img') setThisBird({...thisBird, img: e.target.value});
    else if (e.target.id === 'description') setThisBird({...thisBird, description: e.target.value});
    else if (e.target.id === 'notes') setThisBird({...thisBird, notes: e.target.value});
    else if (e.target.name === 'sightings') {
      // console.log(e.target, objKey);
      let newValue = e.target.value;
      const values = [...thisBird.sightings];
      values[i][objKey] = newValue;
      setThisBird({...thisBird, sightings: values})

      console.log(thisBird.sightings[i][objKey]);
    }
    else if (e.target.name === 'gallery') {
      // console.log(e.target, objKey);
      const newValue = e.target.value;
      const values = [...thisBird.gallery];
      values[i][objKey] = newValue;
      setThisBird({...thisBird, gallery: values})
    }
  }



  return (
    <div>




<div className='form-sighting-line-inputs'>
                
                <select name='sightings' id='sighting-park_id' onChange={(e) => onChange(e, 'park_id', 0)} value={thisBird.sightings[0].park_id}>
                <option name='prompt-option' selected disabled> -- select a location -- </option>
                  {parks.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>

                <br />
                <div>

                  <input type='datetime-local' name='sightings' id='sighting-timestamp' value={thisBird.sightings[0].timestamp} onChange={(e) => onChange(e, 'timestamp', 0)} />

                  {/* EXPERIMENTING */}
                  <input type='text' disabled value={
                    new Date(thisBird.sightings[0].timestamp).toLocaleString()
                    } />

                  {/* <p className='form-input-caption'>Timestamp format: "YYYY-MM-DDTHH:MM:SS"</p> */}
                </div>


                <br />
                <textarea rows='2' type='text' name='sightings' id='sighting-notes' value={thisBird.sightings[0].notes} onChange={(e) => onChange(e, 'notes', 0)}></textarea>


              </div>
      
    </div>
  );
}

export default NewSighting;