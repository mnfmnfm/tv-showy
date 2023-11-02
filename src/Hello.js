import React from 'react';
import { useParams } from 'react-router-dom';

function Hello() {
  // useParams hook gives us back an object with key/value pairs
  // the keys are specified by what comes after the colon in the path in the Route
  // (specifically, that's the Route on line 65 of App.js)
  // the values are what's actually in the URL right now
  const params = useParams();
  return <div>
    Hello, {params.firstName.toUpperCase()} {params.lastName}
  </div>
}

export default Hello;