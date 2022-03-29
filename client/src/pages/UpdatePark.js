import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdatePark = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase, parks} = useContext(DataContext);

  const [thisPark, setThisPark] = useState({});

  useEffect(() => {
    getThisPark();
  },[id])

  const getThisPark = async() => {
    const park = await axios.get(`${apiBase}/parks/${id}`)
    setThisPark(park.data);
    // console.log(thisPark);
  }

  const onChange = (e) => {
    if (e.target.id === 'name') setThisPark({...thisPark, name: e.target.value});
    else if (e.target.id === 'location') setThisPark({...thisPark, location: e.target.value});
    else if (e.target.id === 'address') setThisPark({...thisPark, address: e.target.value});
    else if (e.target.id === 'img') setThisPark({...thisPark, img: e.target.value});
    else if (e.target.id === 'description') setThisPark({...thisPark, description: e.target.value});
    else if (e.target.id === 'notes') setThisPark({...thisPark, notes: e.target.value});
    else if (e.target.id === 'gallery') setThisPark({...thisPark, gallery: e.target.value});

  }

  useEffect(() => {
    console.log(thisPark.name);
  },[thisPark])

  if (thisPark) {
    return (
      <div>
        <h2>Update entry: {thisPark.name}</h2>
        <form>
          <label htmlFor='name'>Name </label>
          <input type='text' id='name' name='name' placeholder='Name of park or hotspot' value={thisPark.name} onChange={(e) => onChange(e)} />
          <br />
          <label htmlFor='location'>Location </label>
          <input type='text' id='location' name='location' placeholder='location of park or hotspot' value={thisPark.location} onChange={(e) => onChange(e)} />
          <br />
          <label htmlFor='address'>Address (for Maps) </label>
          <input type='text' id='address' name='address' placeholder='Maps-able address of park' value={thisPark.address} onChange={(e) => onChange(e)} />
          <br />
          <label htmlFor='img'>Main image URL </label>
          <input type='text' id='img' name='img' placeholder='URL of image (not Instagram)' value={thisPark.img} onChange={(e) => onChange(e)} />
          <br />
          <label htmlFor='description'>Description </label>
          <input type='text' id='description' name='description' placeholder='Description' value={thisPark.description} onChange={(e) => onChange(e)} />
          <br />
          <label htmlFor='notes'>Notes </label>
          <input type='text' id='notes' name='notes' placeholder='notes' value={thisPark.notes} onChange={(e) => onChange(e)} />

        </form>
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
  
export default UpdatePark;