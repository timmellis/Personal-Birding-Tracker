// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Routes, Route} from 'react-router-dom'

// NEEDED FOR USECONTEXT
import {useState, useContext} from 'react' 
import DataContext from './DataContext'
// import ComponentA from './ComponentA';
// import ComponentB from './ComponentB';

import Nav from './components/Nav'
import Main from './pages/Main'
import ExploreBirds from './pages/ExploreBirds'

function App() {

  // const [userInfo, setUserInfo] = useState(
  //   {
  //     name: 'Tim',
  //     favColor: 'blue',
  //     favFood: 'dumplings'
  //   }
  // );
  // const [moreInfo, setMoreInfo] = useState(
  //   [{name: "Another name"}, {name:"A Third name"}]
  // );

  return (
    <div className="App">
      
      <header>
        <Nav />
      </header>

      <h1>Personal Birding Tracker</h1>
     
      {/* <DataContext.Provider value={{ userInfo, setUserInfo, moreInfo}}>
         <ComponentA />
        <ComponentB /> 
      </DataContext.Provider> */}

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/explore/birds' element={<ExploreBirds />} />
      </Routes>


      
      
      
      
    </div>
  );
}

export default App;
