import React from 'react';
import { Link } from 'react-router-dom'

function Nav(props) {
  return (
    <div className='navbar'>
      <div className='nav-btn'> Home </div>
      <div className='nav-btn'> About </div>
      <div className='nav-btn nav-drop'> Explore ▼
        <div className='nav-drop-container'>
        <Link to='explore/birds'><div className='nav-btn nav-drop-btn'>Birds</div></Link>
          <Link to='explore/parks'><div className='nav-btn nav-drop-btn'>Parks & Hotspots</div></Link>
        </div>
      </div>
      <div className='nav-btn nav-drop'> Add ▼
        <div className='nav-drop-container'>
          <Link to='birds/create'><div className='nav-btn nav-drop-btn'>Add a New Bird</div></Link>
          <Link to='parks/create'><div className='nav-btn nav-drop-btn'>Add a New Park</div></Link>
        </div>
      </div>

      <div className='nav-btn'>Another link?</div>
    </div>
  );
}

export default Nav;