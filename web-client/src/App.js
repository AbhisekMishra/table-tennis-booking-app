import React, { Component } from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './routes/login';
import Register from './routes/register';
import Header from './components/header';
import store from './redux';
import ErrorSnackBar from './components/errorSnackBar';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
            </Switch>
          </div>
        </Router>
        <ErrorSnackBar />
      </Provider>
    );
  }
}

export default App;
