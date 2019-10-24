import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../Service/Token-service';

function Header() {
  const token = TokenService.readJwtToken()
  return (
    <>
      <header className="headtag">
        <h1>Hello {token.sub}!</h1>
        <p>Where would you like to go next?</p>
      </header>
      <Link to={`/${token.user_id}/add-trip`}>
        <button className="create-trip-btn" type="submit">Create a Trip</button>
      </Link>
    </>
  )
}


export default Header;