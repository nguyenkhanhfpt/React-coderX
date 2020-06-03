import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import TopMenu from './components/TopMenu';
import Home from './pages/Home';
import Login from './pages/Login';
import Public from './pages/Public';
import { AuthProvider } from './context/AuthContext';
import PrivateRouter from './components/PrivateRouter';

import './App.css';
import PublicRouter from './components/PublicRouter';

function App() {
  return (
    <Router>
      <div className="App">

        <AuthProvider>
          <TopMenu />

          <Switch>
            <PublicRouter path="/login">
              <Login />
            </PublicRouter>
            <Route path="/public">
              <Public />
            </Route>
            <PrivateRouter path="/">
              <Home />
            </PrivateRouter>
          </Switch>

        </AuthProvider>

      </div>
    </Router>
  );
}

export default App;
