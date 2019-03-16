import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const MainTitle = styled(Typography)({
  flexGrow: 1,
});

class NavBar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <MainTitle variant="h6" color="inherit" >
            <Link to="/">Job Ads</Link>
          </MainTitle>
          <Link to="/add">
            <Button color="inherit">Add Customer</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default NavBar;
