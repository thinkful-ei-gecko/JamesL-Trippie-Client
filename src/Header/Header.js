import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className="headtag">
        <h1>Hi 'username'!</h1>
        <p>Where would you like to go next?</p>
      </header>
      <Link to="/add-trip">
        <button className="create-trip-btn" type="submit">Create a Trip</button>
      </Link>
    </>
  )
}

export default Header;