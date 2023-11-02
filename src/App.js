import React, { useEffect, useState } from 'react';
import './App.css';
import Show from './Shows/Show';
import SearchPage from './SearchPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Hello from './Hello';
import ShowDetailPage from './Shows/ShowDetailPage';
// import { Route } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const [numClicks, setNumClicks] = useState(0);
  const [numMouseover, setNumMouseover] = useState(0);

  // set this up with the same datatype that we expect back from the API
  const [shows, setShows] = useState([])

  // write a useEffect to get the data from the api
  useEffect(() => {
    // make the request, transform the response data, and save the data into our state variable
    let abortController = new AbortController();
    fetch('https://api.tvmaze.com/shows',
      { signal: abortController.signal })
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(e => {
        if (e.name !== 'AbortError') {
          throw e;
        }
      });
    return () => {
      console.log('we are running the cleanup function')
      abortController.abort()
    };
  }, [])
  // async/await useEffect code
  // useEffect(() => {
  //   async function loadTvShows() {
  //     const response = await fetch('https://api.tvmaze.com/shows');
  //     const data = await response.json();
  //     setShows(data);
  //   }
  //   loadTvShows();
  // }, []);
  // by default, this useEffect gets rerun every time a state variable updates
  // even though the state variable is not related at all
  // or, we can pass in an array of dependencies to change that
  useEffect(() => {
    // inside of this callback function, we can run side-effect-ful code
    document.title = `TV Showy${new Date().toTimeString()}`

    // return a cleanup function to set the document title to something else
    return () => document.title = 'goodbye';
  }, [numMouseover])
  return (
    <Router>
      <div className="container">
        <h1 onClick={() => setNumClicks(numClicks + 1)} onMouseOver={() => setNumMouseover(numMouseover + 1)}>TV Showy {numMouseover} {numClicks}</h1>
        {/* <a href="/">Home</a>
        <a href="/search">Search</a> */}
        <Link to="/" className="btn btn-primary">Home</Link>
        <Link to="/search" className="btn btn-secondary">Search</Link>
        {/* Route acts like a conditional - now, the SearchPage will ONLY render on a path that matches "/search" */}
        <Switch>
          {/* the colon in front makes that segment a parameter */}
          <Route path="/" exact={true}>
            <ul>
              {shows.map(potato => <Show show={potato} key={potato.id} />)}
            </ul>
          </Route>
          <Route path="/hello/:firstName/:lastName">
            <Hello />
          </Route>

          <Route path="/shows/:id">
            <ShowDetailPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>

          <Route>
            <h4>Sorry, route not found. Please use the links above to visit the home or search pages.</h4>
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
