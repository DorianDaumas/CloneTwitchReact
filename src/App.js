import React from 'react';
import './App.css';
import Header from './header/Header'
import Sidebar from './component/sidebar/Sidebar';
import Games from './component/games/Games';
import TopStreams from './component/topStream/TopStreams';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Live from './component/live/Live'
import GameStream from './component/gameStream/GameStream';
import SearchResult from './component/searchResult/SearchResult';
import ErrorResult from './component/ErrorResult'
import Decouverte from './component/Decouverte/Decouverte';

function App() {
  return (

    <Router
    forceRefresh={true}
    >
      <React.Fragment>
        <Header />
        <div className="DisplayDashboard">
          <Sidebar />
          <Switch>
              <Route exact path="/" component={Decouverte} />
              <Route exact path="/discover" component={Decouverte} />
              <Route exact path="/top-games" component={Games} />
              <Route exact path="/top-streams" component={TopStreams} />
              <Route exact path="/game/:slug" component={GameStream} />
              <Route exact path="/live/:slug" component={Live} />
              <Route exact path="/search/:slug" component={SearchResult} />
              <Route exact path="/search" component={ErrorResult} />
          </Switch>
        </div>
      </React.Fragment>
    </Router>
  );
}

export default App;
