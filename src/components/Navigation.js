import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <ul>
                <NavLink to='/' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Pokedex</li>
                </NavLink>
                <NavLink to='/gigamax' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Gigamax</li>
                </NavLink>
                <NavLink to='/contact' className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Contact</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;