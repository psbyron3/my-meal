import React, { Component } from 'react';
import { Link } from 'react-router';
import SearchBar from '../containers/searchBar';
import NavBar from 'react-bootstrap/lib/Navbar';
// import AppBar from 'material-ui/AppBar';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

// import materialize from 'materialize-css';

export default class NavBarComp extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {};
  // }

  render() {
    return (
      <div className="nav-bar">
        <NavBar fixedTop inverse>
          <div className="nav-logo">
            <Link to="/">Food Now!</Link>
          </div>
          <SearchBar />
          <div className="sign-up">
            <button className="btn btn-primary">Sign Up</button>
          </div>
          <div className="sign-in">
            <button className="btn btn-primary">Sign In</button>
          </div>
        </NavBar>
      </div>

    );
  }
}


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
