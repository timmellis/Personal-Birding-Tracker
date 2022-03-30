// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Routes, Route, useParams, useSearchParams} from 'react-router-dom'
// import dotenv from 'dotenv'

// NEEDED FOR USECONTEXT
import {useState, useContext, useEffect} from 'react' 
import DataContext from './DataContext'

import Nav from './components/Nav'
import Main from './pages/Main'
import ExploreBirds from './pages/ExploreBirds'
import ExploreParks from './pages/ExploreParks' 
import ParkDetails from './pages/ParkDetails' 

import UpdatePark from './pages/crud_pages/UpdatePark'
import CreatePark from './pages/crud_pages/CreatePark'
import DeletePark from './pages/crud_pages/DeletePark'

function App() {


  const base = (process.env.REACT_APP_BACKEND == 'local')
    ? `http://localhost:3001/api`
    : `https://remotesever.com/mysite` 

  const [apiBase, setApiBase] = useState(base);

  const [parks, setParks] = useState([]);
  const [birds, setBirds] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const refreshParksAndBirds = async() => {
    const allParks = await axios.get(`${base}/parks`)
    const allBirds = await axios.get(`${base}/birds`)
//    console.log("getParks, allParks:", allParks.data);
    setParks(allParks.data);
    setBirds(allBirds.data);  
    
    console.log("UseEffect parks:", parks);
    console.log("UseEffect Birds: ", birds);
  }


  useEffect(() => {
    refreshParksAndBirds();
  },[searchParams])

  // const [userInfo, setUserInfo] = useState(
  //   { name: 'Tim', favColor: 'blue', favFood: 'dumplings' }
  // );
  // const [moreInfo, setMoreInfo] = useState(
  //   [{name: "Another name"}, {name:"A Third name"}]
  // );

  if (parks.length && birds.length) {
    return (
      <div className="App">
        
        <header>
          <h1>Personal Birding Tracker</h1>
          <Nav />
        </header>

        <DataContext.Provider value={{apiBase, parks, setParks, birds, setBirds, refreshParksAndBirds}}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/explore/birds' element={<ExploreBirds />} />
            <Route path='/explore/parks' element={<ExploreParks />} />
            
            <Route path='/explore/parks/:id' element={<ParkDetails />} />

            <Route path='/modify/parks/update/:id' element={<UpdatePark />} />
            <Route path='/modify/parks/delete/:id' element={<DeletePark />} />
            <Route path='/modify/parks/create/' element={<CreatePark />} />
          </Routes>
        </DataContext.Provider>


        
        
        
        
      </div>
    );
  } else {
    return (
      <div className='loading'>
        Loading...
      </div>
    )
  }
}

export default App;
