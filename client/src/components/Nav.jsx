import React from 'react';
import { Link } from 'react-router-dom'

function Nav(props) {
  return (
    <div className='navbar'>
      <Link to='/' className='nav-btn'> Home </Link>
      <Link to='/about' className='nav-btn'> About </Link>
      <div className='nav-btn nav-drop'> Explore ▼
        <div className='nav-drop-container'>
        <Link to='explore/birds'><div className='nav-btn nav-drop-btn'>Birds</div></Link>
          <Link to='explore/parks'><div className='nav-btn nav-drop-btn'>Parks & Hotspots</div></Link>
        </div>
      </div>
      <div className='nav-btn nav-drop'> Add ▼
        <div className='nav-drop-container'>
          <Link to='modify/birds/create'><div className='nav-btn nav-drop-btn'>Add a New Bird</div></Link>
          <Link to='modify/parks/create'><div className='nav-btn nav-drop-btn'>Add a New Park</div></Link>
          <Link to='modify/birds/new-sighting'><div className='nav-btn nav-drop-btn'>Add a New Sighting</div></Link>
        </div>
      </div>

      <Link to='https://ebird.org/home' className='nav-btn'>eBird.org</Link>
    </div>
  );
}

export default Nav;