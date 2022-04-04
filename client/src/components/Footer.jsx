import React from 'react';
import { Link } from 'react-router-dom'

function Footer(props) {
  return (
    <div className='footer-wrapper'>
      <div className='footer-left'>Created as part of the General Assembly<br />SEI  program, Feb-May, 2022</div>
      <div className='footer-center'>
      <div className='social' id='github' onClick={() => window.open('https://github.com/timmellis','_blank')}></div>
      <div className='social' id='linkedin' onClick={() => window.open('https://www.linkedin.com/in/tim-m-ellis/','_blank')}></div>
      <div className='social' id='insta' onClick={() => window.open('https://www.instagram.com/notsosecretbirder/','_blank')}></div>
      </div>
      <div className='footer-right'>Design © Tim Ellis, 2022</div>
    </div>
  );
}

export default Footer;