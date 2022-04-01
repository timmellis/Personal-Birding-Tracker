// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Routes, Route, useParams, useSearchParams} from 'react-router-dom'
// import dotenv from 'dotenv'

// NEEDED FOR USECONTEXT
import {useState, useContext, useEffect} from 'react' 
import DataContext from './DataContext'

import Main from './pages/Main'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ExploreParks from './pages/ExploreParks' 
import ParkDetails from './pages/ParkDetails' 
import UpdatePark from './pages/crud_pages/UpdatePark'
import CreatePark from './pages/crud_pages/CreatePark'
import DeletePark from './pages/crud_pages/DeletePark'
import ExploreBirds from './pages/ExploreBirds'
import BirdDetails from './pages/BirdDetails' 
import UpdateBird from './pages/crud_pages/UpdateBird'
import CreateBird from './pages/crud_pages/CreateBird'
import DeleteBird from './pages/crud_pages/DeleteBird'
import NewSighting from './pages/crud_pages/NewSighting'

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

      <div className='App-Body'>
        <div className='page-wrapper'>
        <DataContext.Provider value={{apiBase, parks, setParks, birds, setBirds, refreshParksAndBirds}}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/explore/parks' element={<ExploreParks />} />
            <Route path='/explore/parks/:id' element={<ParkDetails />} />
            <Route path='/modify/parks/create/' element={<CreatePark />} />
            <Route path='/modify/parks/update/:id' element={<UpdatePark />} />
            <Route path='/modify/parks/delete/:id' element={<DeletePark />} />

            <Route path='/explore/birds' element={<ExploreBirds />} />
            <Route path='/explore/birds/:id' element={<BirdDetails />} />
            <Route path='/modify/birds/create/' element={<CreateBird />} />
            <Route path='/modify/birds/update/:id' element={<UpdateBird />} />
            <Route path='/modify/birds/delete/:id' element={<DeleteBird />} />
            <Route path='/modify/birds/newsighting/:id?' element={<NewSighting />} />

          </Routes>
        </DataContext.Provider>
        </div> {/* page-wrapper */}
      </div> 

        <footer>
          <Footer />
        </footer>
        
        
        
        
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
