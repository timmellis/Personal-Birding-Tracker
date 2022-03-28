import React from 'react';
import { Link } from 'react-router-dom'

function Nav(props) {
  return (
    <div className='navbar'>
      <div className='nav-btn'> Home </div>
      <div className='nav-btn'> About </div>
      <div className='nav-btn nav-drop'> Explore ▼
        <div className='nav-drop-container'>
          <div className='nav-btn nav-drop-btn'><Link to='explore/birds'>Birds</Link></div>
          <div className='nav-btn nav-drop-btn'><Link to='explore/parks'>Parks & Hotspots</Link></div>
        </div>
      </div>
      <div className='nav-btn nav-drop'> Add ▼
        <div className='nav-drop-container'>
          <div className='nav-btn nav-drop-btn'><Link to='birds/create'>Add a New Bird</Link></div>
          <div className='nav-btn nav-drop-btn'><Link to='parks/create'>Add a New Park</Link></div>
        </div>
      </div>

      <div className='nav-btn'>Another link?</div>
    </div>
  );
}

export default Nav;