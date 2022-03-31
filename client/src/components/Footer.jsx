import React from 'react';
import { Link } from 'react-router-dom'

function Footer(props) {
  return (
    <div className='footer-wrapper'>
      <div className='footer-left'>Footer left content</div>
      <div className='footer-center'>Footer center content</div>
      <div className='footer-right'>Footer right content</div>
    </div>
  );
}

export default Footer;