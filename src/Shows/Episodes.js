import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function Episodes() {
  const params = useParams();
  let [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${params.id}/episodes`)
      .then(response => response.json())
      .then(data => setEpisodes(data));
  }, [params.id])
  return <div>
    {episodes.map(e => <div key={e.id}>S{e.season}E{e.number}: {e.name}</div>)}
  </div>
}

export default Episodes;