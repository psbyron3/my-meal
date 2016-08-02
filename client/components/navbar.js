import React, { Component } from 'react';
import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import materialize from 'materialize-css';


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = '';
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="nav-logo">
            Let's Eat
          </div>
          <div className="nav-search">
            <form >
              <input type="search" placeholder="Search" />
            </form>
          </div>
        </nav>
      </div>

    );
  }
}

export default NavBar;


        // <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        //   <AppBar
        //     title="Mealz"
        //     iconElementRight={
        //       <IconMenu
        //         iconButtonElement={
        //         <IconButton><MoreVertIcon /></IconButton>
        //         }
        //         targetOrigin={{horizontal: 'right', vertical: 'top'}}
        //         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        //       >
        //       <MenuItem primaryText="Refresh" />
        //       <MenuItem primaryText="Help" />
        //       <MenuItem primaryText="Sign out" />
        //     </IconMenu>
        //   }
        //   />
        // </MuiThemeProvider>
