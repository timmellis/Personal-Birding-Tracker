import mongoose from 'mongoose';
import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { Axios } from 'axios'

const UpdateBird = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, refreshParksAndBirds, parks} = useContext(DataContext);
  


  const [timestampString, setTimestampString] = useState(
    `${new Date().getFullYear()}-01-01T00:00:00`);



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
      const newValue = e.target.value;
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


  const makeTimestampArrays = () => {
    let y=[], mos=[], d=[], h=[], min=[], s=[];
    // YRS
    for (let i=0; i < 3; i++) y.push(`${new Date().getFullYear()-i}`);
    for (let j=1; j <= 12; j++) j < 10 ? mos.push(`0${j}`) : mos.push(`${j}`);
    for (let k=1; k <= 31; k++) k < 10 ? d.push(`0${k}`) : d.push(`${k}`);
    for (let l=0; l < 24; l++) l < 10 ? h.push(`0${l}`) : h.push(`${l}`);
    for (let m=0; m < 60; m++) m < 10 ? min.push(`0${m}`) : min.push(`${m}`);
    for (let n=0; n < 60; n++) n < 10 ? s.push(`0${n}`) : s.push(`${n}`);

    return {years: y, months: mos, days: d, hours: h, mins: min, secs: s} 
  }
  const timestampArrays = makeTimestampArrays(); 
  // console.log(timestampArrays);

  const galleryAdd = (e) => {
    e.preventDefault();
    let bird = {...thisBird};
    bird.gallery.push({url:"", note:""});
    setThisBird(bird);
  }

  const galleryRemove = (e) => {
    e.preventDefault();
    let bird = {...thisBird};
    bird.gallery.pop({url:"", note:""});
    setThisBird(bird);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const updateUrl = `${apiBase}/birds/update/${id}`;
        
    await axios.put(updateUrl, thisBird)
    .then(res => {
      console.log(res);
      navigate(`/explore/birds/${id}?status=upated`);
    })
  }

  useEffect(() => {
    // console.log(thisBird.name);
  },[thisBird])

  if (thisBird) {
    return (
      <div>
        <h2>Update entry: "{thisBird.name}"</h2>
        
        <div className='update-form-wrapper'>
        <form className='update-form' onSubmit={(e) => onSubmit(e)}>
          <label htmlFor='name'>Name* </label>
          <input type='text' id='name' name='name' placeholder='Name of bird' value={thisBird.name} onChange={(e) => onChange(e)} />
          
          <label htmlFor='species_code'>Species Code </label>
          <div>
            <input type='text' id='species_code' name='species_code' placeholder='eBird Species Code' value={thisBird.species_code} onChange={(e) => onChange(e)} />
            <p className='form-input-caption'>Use the "eBird species code lookup" tool</p>
          </div>
          <label htmlFor='img'>Main image URL </label>
          <input type='text' id='img' name='img' placeholder='URL of image (not Instagram)' value={thisBird.img} onChange={(e) => onChange(e)} />
          
          <label htmlFor='description'>Description </label>
          <textarea rows='5' type='text' id='description' name='description' placeholder='Description' value={thisBird.description} onChange={(e) => onChange(e)}></textarea>
          
          <label htmlFor='keywords'>Keywords </label>
          <div>
           <input type='text' id='keywords' name='keywords' placeholder='Keywords or search terms' value={thisBird.keywords} onChange={(e) => onChange(e)} />
            <p className='form-input-caption'>(comma separated)</p> 
          </div>
          <label htmlFor='notes'>Notes </label>
          <textarea rows='5' id='notes' name='notes' placeholder='notes' value={thisBird.notes} onChange={(e) => onChange(e)}></textarea>


          <div>
            <label htmlFor='sightings'>Add a Sighting* </label>
          </div>
          <div>
            <div className='form-gallery-line'>
              <div> 
                <label htmlFor='sighting-park_id'>Location* </label>
                <br />
                <label htmlFor='sighting-timestamp'>Timestamp* </label>
                <br /><br />
                <label htmlFor='sighting-notes'>Notes </label>

              </div>
              <div className='form-sighting-line-inputs'>
                
                <select name='sightings' id='sighting-park_id' onChange={(e) => onChange(e, 'park_id', 0)} value={thisBird.sightings[0].park_id}>
                <option name='prompt-option' selected disabled> -- select a location -- </option>
                  {parks.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>

                <br />
                <div>
                  {/* <input type='text' name='sightings' id='timestamp' value={timestampString} onChange={(e) => onChange(e,'timestamp',0)} disabled />
                  <select name='timestamp-YYYY' id='timestamp-YYYY' onChange={() => }>
                    {timestampArrays.years.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                    </select>
                    -
                    <select name='timestamp-MM' id='timestamp-MM'>
                    {timestampArrays.months.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))
                    }
                  </select> */}

                  {/* <input type='datetime-local' name='sightings' id='datetimelocal' required pattern="\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}" /><span className='validity'></span> */}

                  <input type='datetime-local' name='sightings' id='sighting-timestamp' value={thisBird.sightings[0].timestamp} onChange={(e) => onChange(e, 'timestamp', 0)} />
                  <p className='form-input-caption'>Timestamp format: "YYYY-MM-DDTHH:MM:SS"</p>
                </div>
                <br />
                <textarea rows='2' type='text' name='sightings' id='sighting-notes' value={thisBird.sightings[0].notes} onChange={(e) => onChange(e, 'notes', 0)}></textarea>


              </div>
            </div>
          </div>

          <div>
            <label htmlFor='gallery'>Gallery Images</label>
            <button id='addOne' onClick={(e) =>galleryAdd(e)}>+ add</button>
          </div>
          <div>

            {/* {console.log(thisBird.gallery)} */}


          {thisBird.gallery.map((item, i) => (
            <div key={i} className='form-gallery-line'>
              <div>
                <span>{i+1}. <br /></span>
              {(thisBird.gallery.length > 1 && i===thisBird.gallery.length-1) && 
                <button onClick={(e) => galleryRemove(e)}>Delete</button>
                }
              </div>
              <div className='form-gallery-line-inputs'>
                
                <label htmlFor={`gallery-img-url-${i}`}>Image URL </label>
                <input key={i} type='text' name='gallery' id={`gallery-img-url-${i}`} value={item.url} onChange={(e) => onChange(e, 'url', i)} />
                
                <br />
                
                <label htmlFor={`gallery-img-caption-${i}`}>Caption </label>
                <input type='text' id={`gallery-img-note-${i}`} value={item.note} name='gallery' onChange={(e) => onChange(e, 'note', i)} />

              </div>
              { item.url &&
                <img src={item.url} width='100%;' alt='demo thumbnail' />
              }
            </div>
          ))}
          

          </div>

          <div className='form-buttons'>
            <button type='submit'
            disabled={!thisBird.name || !thisBird.sightings[0].park_id}>
              Save
            </button>
            <button type='button' 
              onClick={() => navigate('/explore/birds')}>Cancel</button>
          </div>

        </form>
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
  
export default UpdateBird;