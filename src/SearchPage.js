import React, { useState } from 'react';
import Show from './Shows/Show';

function SearchPage() {
  // user is gonna type in our input (and we keep track in a state var of what they've typed)
  // when they hit the submit button, we make a request to the tvmaze api using their search term
  // when we get back a response from the API, we display the shows on the page
  const [query, setQuery] = useState('');

  const [searchResults, setSearchResults] = useState([])
  function handleSubmit(event) {
    event.preventDefault();
    fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      .then(response => response.json())
      .then(data => setSearchResults(data));
  }
  return <div>
    <h2>Search</h2>
    <form onSubmit={handleSubmit}>
      <input type="text"
        name="query"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <input type="submit" />
    </form>
    {searchResults.map(result => <Show show={result.show} />)}
  </div>
}

export default SearchPage;
