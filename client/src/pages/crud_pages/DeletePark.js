import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { Axios } from 'axios'

const DeletePark = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase} = useContext(DataContext);
  const [thisPark, setThisPark] = useState(
    {
      "name": "",
      "location": "",
      "address": "",
      "gallery": [
        {
          "url": "",
          "note": "",
        },
        {
          "url": "",
          "note": "",
        }
      ],
      "img": "",
      "description": "",
      "notes": " ",
    }
  );

  const getThisPark = async() => {
    const park = await axios.get(`${apiBase}/parks/${id}`)
    setThisPark(park.data);
    // console.log(thisPark);
  }

  useEffect(() => {
    getThisPark();
  },[id])

  const onChange = (e, objKey, i) => {
    if (e.target.id === 'name') setThisPark({...thisPark, name: e.target.value});
    else if (e.target.id === 'location') setThisPark({...thisPark, location: e.target.value});
    else if (e.target.id === 'address') setThisPark({...thisPark, address: e.target.value});
    else if (e.target.id === 'img') setThisPark({...thisPark, img: e.target.value});
    else if (e.target.id === 'description') setThisPark({...thisPark, description: e.target.value});
    else if (e.target.id === 'notes') setThisPark({...thisPark, notes: e.target.value});
    else if (e.target.name === 'gallery') {
      // console.log(e.target, objKey);
      const newValue = e.target.value;
      const values = [...thisPark.gallery];
      values[i][objKey] = newValue;
      setThisPark({...thisPark, gallery: values})
    }
  }

  const galleryAdd = (e) => {
    e.preventDefault();
    let park = {...thisPark};
    park.gallery.push({url:"", note:""});
    setThisPark(park);
  }

  const galleryRemove = (e) => {
    e.preventDefault();
    let park = {...thisPark};
    park.gallery.pop({url:"", note:""});
    setThisPark(park);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (window.confirm("Are you sure you want to delete this entry?") === true) { 
      const deleteUrl = `${apiBase}/parks/delete/${id}`;
       
      await axios.delete(deleteUrl, thisPark)
      .then(res => {
        console.log(res);
        navigate(`/explore/parks/?status=deleted`);
     })
    } else {
      return null;
    }
  }

  useEffect(() => {
    // console.log(thisPark.name);
  },[thisPark])

  if (thisPark) {
    return (
      <div>
        <h2>Delete entry: {thisPark.name}</h2>
        
        <div className='update-form-wrapper'>
        <form className='update-form' onSubmit={(e) => onSubmit(e)}>
          
          <div className='form-buttons'>
            <button type='submit'><b>✗</b> DELETE</button>
            <button type='button' onClick={() => navigate(-1)}>Cancel</button>
          </div>

          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' placeholder='Name of park or hotspot' value={thisPark.name} disabled />
          
          <label htmlFor='location'>Location </label>
          <input type='text' id='location' name='location' placeholder='location of park or hotspot' value={thisPark.location} disabled />
          
          <label htmlFor='address'>Address (for Maps) </label>
          <input type='text' id='address' name='address' placeholder='Maps-able address of park' value={thisPark.address} disabled />
          
          <label htmlFor='img'>Main image URL </label>
          <input type='text' id='img' name='img' placeholder='URL of image (not Instagram)' value={thisPark.img} disabled />
          
          <label htmlFor='description'>Description </label>
          <textarea rows='5' type='text' id='description' name='description' placeholder='Description' value={thisPark.description} disabled></textarea>
          
          <label htmlFor='notes'>Notes </label>
          <textarea rows='5' cols='50' id='notes' name='notes' placeholder='notes' value={thisPark.notes} disabled></textarea>

          <div>
            <label htmlFor='gallery'>Gallery Images</label>
          </div>
          <div>

            {/* {console.log(thisPark.gallery)} */}


          {thisPark.gallery.map((item, i) => (
            <div key={i} className='form-gallery-line'>
              <div>
                <span>{i+1}. <br /></span>
              {(thisPark.gallery.length > 1 && i===thisPark.gallery.length-1) && 
                <button onClick={(e) => galleryRemove(e)}>Delete</button>
                }
              </div>
              <div>
                <label htmlFor={`gallery-img-url-${i}`}>Image URL </label>
                
                <input key={i} type='text' name='gallery' id={`gallery-img-url-${i}`} value={item.url} disabled />
                
                <br />
                
                <label htmlFor={`gallery-img-caption-${i}`}>Caption </label>
                
                <input type='text' id={`gallery-img-note-${i}`} value={item.note} name='gallery'  disabled />
              </div>
              
              <img src={item.url} width='100px;' alt='demo thumbnail' />
            </div>
          ))}
          
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
  
export default DeletePark;