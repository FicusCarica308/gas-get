/* Header component */
import React from 'react';
import './Footer.css';
import linkedinIcon from '../assets/linkedin.png'
import githubIcon from '../assets/github.png'
import meIcon from '../assets/Me.jpg'

export default function Header(props) {
  return (
    <footer className="App-footer">
      <div id="icon-container">
        <a href="https://www.linkedin.com/in/manuel-figueroa-292216215"><img alt="linkedin-icon" id="linkedin-icon" src={linkedinIcon}/></a>
        <img alt="dev-me-icon" id="me-icon" src={meIcon}/>
        <a href="https://github.com/FicusCarica308/gas-get"><img alt="github-icon" id="github-icon" src={githubIcon}/></a>
      </div>
    </footer>
  );
}
