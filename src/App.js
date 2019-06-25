import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from './Main';
import Hotel from './Hotel';
import * as data from './data.json';

function Index(query) {
  const search = query.location.search.length > 0 ? decodeURI(query.location.search.slice(1)) : ''
  return <Main hotels={data.default} searchString={search} />;
}

function Page(query) {
  const { id } = query.match.params;
  const search = query.location.search.length > 0 ? decodeURI(query.location.search.slice(1)) : ''
  return <Hotel hotel={data.default[id]} searchString={search} />;
}

function App() {
  return (
    <Router>
      <Route path="/" exact component={Index} />
      <Route path="/hotel/:id" component={Page} />
    </Router>
  );
}

export default App;