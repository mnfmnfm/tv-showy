import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Show({ show }) {
  return <div>
    {/* that to contains curly braces to switch to JS, then backticks to make a template literal, then a money hug in the template literal */}
    <Link to={`/shows/${show.id}`}><h2>{show.name}</h2></Link>
    <img src={show.image?.medium} />
    <p>Average rating: {show.rating.average}</p>
  </div>
}

export default Show;