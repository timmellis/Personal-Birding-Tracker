import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../DataContext'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import BirdCard from './BirdCard';
import ParkCard from './ParkCard';

function Search(props) {


  let navigate = useNavigate();
  const {apiBase, parks, birds, searchParams} = useContext(DataContext);

const [searchQuery, setSearchQuery] = useState("");
const [queryDb, setQueryDb] = useState('birds');
const [queryResults, setQueryResults] = useState([]);

const handleChange = (e) => {
  if (e.target.name === 'search-query') setSearchQuery(e.target.value);
  else if (e.target.name === 'query-db') setQueryDb(e.target.value);
} 
const filterResults = () => {
  let arr = [];
  if (queryDb==='birds') {
    arr = birds.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  } else if (queryDb==='locations') {
    arr = parks.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }
  setQueryResults(arr);
}

useEffect(() => {
  filterResults();
},[searchQuery, queryDb])

function showPage(db,id) {
  navigate(`/explore/${db}/${id}`);
} 

  return (
    <div>
      <h3>Search by location or by bird species:</h3>
      <input value={searchQuery} name='search-query' onChange={(e) => handleChange(e)} />
      <br />
      <input type='radio' name='query-db' value='birds' defaultChecked onChange={(e) => handleChange(e)} />Birds
      <input type='radio' name='query-db' value='locations'  onChange={(e) => handleChange(e)} />Locations
      <p className='details-message'>Searching: '{queryDb}'</p>

      <div className='results-display'>
        {searchQuery.length ? 
          <div className='cards-grid'>
          { queryDb==='birds' &&
            queryResults.map((obj, index) => (
            <BirdCard key={index} bird={obj} onClick={() => showPage("birds", obj._id)} />
            ))
          }
          {queryDb==='locations' &&
            queryResults.map((obj, index) => (
              <ParkCard key={index} park={obj} onClick={() => showPage("parks", obj._id)} />
              ))  
          }
          </div> 
          :
          <div>Results...</div> }
        {console.log("QUERY RESULTS:", queryResults)}
      </div>
    </div>
  );
}

export default Search;