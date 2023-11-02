import React, { useEffect, useState } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import Episodes from './Episodes';

function ShowDetailPage() {
  // const routeMatch = useRouteMatch();
  // we will generally destructure this immediately
  const { url, path } = useRouteMatch();
  const params = useParams();
  const [showData, setShowData] = useState({});
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}`)
      .then(response => response.json())
      .then(data => setShowData(data))
  }, [params.id])
  if (showData.id) {

    return <div>
      <h2>{showData.name}</h2>
      <img src={showData.image.medium} />
      <div>

        <Link to={url} className="btn btn-warning">Show Summary</Link>
        <Link to={`${url}/episodes`} className="btn btn-warning">Episodes</Link>
      </div>
      <Route path={path} exact>
        <p>{showData.name} is a {showData.type} show where each episode is {showData.runtime} minutes long.</p>
        <p>{showData.summary.replaceAll(/<\/?.>/g, '')}</p>
      </Route>
      <Route path={`${path}/episodes`}>
        <Episodes />
      </Route>
    </div>
  } else {
    return <div>Loading...</div>
  }
}

export default ShowDetailPage;
