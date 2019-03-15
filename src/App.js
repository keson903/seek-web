import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';
import styled from 'styled-components';
import NavBar from './shared/NavBar';
import CustomersPage from './list/Customers';
import CustomerAddPage from './add/CustomerAdd';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point',
});

const Root = styled.div({

})


class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <Router>
          <Root>
            <NavBar />

            <Route exact path="/" component={CustomersPage} />
            <Route path="/add" component={CustomerAddPage} />
          </Root>
        </Router>
      </JssProvider>
    );
  }
}

export default App;
