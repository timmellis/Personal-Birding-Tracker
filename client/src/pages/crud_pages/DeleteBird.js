import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../DataContext'
import { useNavigate, useParams } from 'react-router-dom'
import axios, { Axios } from 'axios'

const DeleteBird = (props) => {

  let {id} = useParams()
  let navigate = useNavigate();

  const {apiBase} = useContext(DataContext);
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
    // console.log(thisBird);
  }

  useEffect(() => {
    getThisBird();
  },[id])

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (window.confirm("Are you sure you want to delete this entry?") === true) { 
      const deleteUrl = `${apiBase}/birds/delete/${id}`;
       
      await axios.delete(deleteUrl, thisBird)
      .then(res => {
        console.log(res);
        navigate(`/explore/birds/?status=deleted`);
     })
    } else {
      return null;
    }
  }

  useEffect(() => {
    // console.log(thisBird.name);
  },[thisBird])

  if (thisBird) {
    return (
      <div>
        <h2>Delete entry: "{thisBird.name}"</h2>
        
        <div className='delete-form-wrapper'>
        <form className='update-form' onSubmit={(e) => onSubmit(e)}>
          
          <div className='form-buttons'>
            <h3 style={{display:'inline-block'}}>Confirm:</h3>
            <button type='submit'><b>✗</b> DELETE</button>
            <button type='button' onClick={() => navigate(-1)}>Cancel</button>
          </div>

          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' placeholder='Name of bird' value={thisBird.name} disabled />
          
          <label htmlFor='species_code'>Species Code </label>
            <input type='text' id='species_code' name='species_code' placeholder='eBird Species Code' value={thisBird.species_code} disabled />
          
          <label htmlFor='img'>Main image URL </label>
          <input type='text' id='img' name='img' placeholder='URL of image (not Instagram)' value={thisBird.img} disabled />
          
          <label htmlFor='description'>Description </label>
          <textarea rows='5' type='text' id='description' name='description' placeholder='Description' value={thisBird.description} disabled></textarea>

          <label htmlFor='keywords'>Keywords </label>
           <input type='text' id='keywords' name='keywords' placeholder='Keywords or search terms' value={thisBird.keywords} disabled />

          <label htmlFor='notes'>Notes </label>
          <textarea rows='5' cols='50' id='notes' name='notes' placeholder='notes' value={thisBird.notes} disabled></textarea>



          <div>
            <label htmlFor='sightings'>Add a Sighting</label>
          </div>
          <div>
            <label style={{fontStyle:'italic'}}> [Sightings Data] </label>
          </div>



          <div>
            <label htmlFor='gallery'>Gallery Images</label>
          </div>
          <div>
            {thisBird.gallery.map((item, i) => (
            <div key={i} className='form-gallery-line'>
              <div>
                <span>{i+1}. <br /></span>
              </div>
              <div>
                <label htmlFor={`gallery-img-url-${i}`}>Image URL </label>
                <input key={i} type='text' name='gallery' id={`gallery-img-url-${i}`} value={item.url} disabled />
                <br />
                <label htmlFor={`gallery-img-caption-${i}`}>Caption </label>
                <input type='text' id={`gallery-img-note-${i}`} value={item.note} name='gallery'  disabled />
              </div>
              <img src={item.url} width='100px;' alt='demo thumbnail' style={{opacity:'50%'}} />
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
  
export default DeleteBird;