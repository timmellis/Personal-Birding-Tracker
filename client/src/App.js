// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Routes, Route} from 'react-router-dom'
// import dotenv from 'dotenv'

// NEEDED FOR USECONTEXT
import {useState, useContext, useEffect} from 'react' 
import DataContext from './DataContext'
// import ComponentA from './ComponentA';
// import ComponentB from './ComponentB';

import Nav from './components/Nav'
import Main from './pages/Main'
import ExploreBirds from './pages/ExploreBirds'
import ExploreParks from './pages/ExploreParks' 

function App() {

  console.log("ENV=",process.env.REACT_APP_BACKEND);

  const base = (process.env.REACT_APP_BACKEND == 'local')
    ? `http://localhost:3001/api`
    : `https://remotesever.com/mysite` 


console.log("THE BASE IS", base);

    const [parks, setParks] = useState([]);
    const [birds, setBirds] = useState([]);

  const getParksAndBirds = async() => {
    const allParks = await axios.get(`${base}/parks`)
    const allBirds = await axios.get(`${base}/birds`)
//    console.log("getParks, allParks:", allParks.data);
    setParks(allParks.data);
    setBirds(allBirds.data);  
    
    console.log("UseEffect parks:", parks);
    console.log("UseEffect Birds: ", birds);
  }
  const getBirds = async() => {
    const allBirds = await axios.get(`${base}/birds`)
//    console.log("getParks, allParks:", allParks.data);
    setBirds(allBirds.data);
  }

  useEffect(() => {
    getParksAndBirds();
  },[])

  // const [userInfo, setUserInfo] = useState(
  //   { name: 'Tim', favColor: 'blue', favFood: 'dumplings' }
  // );
  // const [moreInfo, setMoreInfo] = useState(
  //   [{name: "Another name"}, {name:"A Third name"}]
  // );

  return (
    <div className="App">
      
      <header>
        <h1>Personal Birding Tracker</h1>
        <Nav />
      </header>

      
     
      {/* <DataContext.Provider value={{ userInfo, setUserInfo, moreInfo}}>
         <ComponentA />
        <ComponentB /> 
      </DataContext.Provider> */}

      <DataContext.Provider value={{parks, setParks}}>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/explore/birds' element={<ExploreBirds />} />
          <Route path='/explore/parks' element={<ExploreParks />} />
        </Routes>
      </DataContext.Provider>


      
      
      
      
    </div>
  );
}

export default App;
