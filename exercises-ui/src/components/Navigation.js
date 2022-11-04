import React from 'react';
import {Link} from 'react-router-dom'

function Navigation() {
    return (
        <nav>
        <Link to="/add-exercise">Add an exercise</Link>
        <p></p>
        <Link to="/"> Home</Link>
        </nav>
    );
}

export default Navigation;
