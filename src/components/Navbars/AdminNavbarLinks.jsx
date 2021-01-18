
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class AdminNavbarLinks extends Component {

  logOut = e => {



    confirmAlert({
      title: '?',
      message: "Voulez-vous vous déconnectez? ",
      buttons: [
        {
          label: 'Oui',
          onClick: () => {
            window.location.href = "/login";
            window.sessionStorage.clear();
          }
        },
        {
          label: 'Non',
          onClick: () => {
            return false;
          },
          
        }
      ]
    })



  }


  render() {
    const notification = (
      <div>
        <i className="fa fa-globe " />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>

          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem onClick={this.logOut}>
            <i className="fa fa-user" />Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
