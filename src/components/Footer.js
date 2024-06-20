import React from 'react';
import { NavLink } from 'react-router-dom';
import githubIcon from '../assets/img/github.png';
import linkedinIcon from '../assets/img/linkedin.png';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="radio-container-footer">
                <div className="icons-container">
                    <NavLink to='https://github.com/Lydoww' target="_blank" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <img className='icon' src={githubIcon} alt="GitHub Profile" />
                    </NavLink>
                    <NavLink to='https://www.linkedin.com/in/alexis-helm/' target="_blank" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <img className='icon' src={linkedinIcon} alt="Linkedin Profile" />
                    </NavLink>
                </div>
            </div>
            <p>Créé par Alexis Helm</p>
        </div>
    );
};

export default Footer;
