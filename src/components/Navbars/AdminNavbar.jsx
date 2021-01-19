
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import AdminNavbarLinks from "./AdminNavbarLinks.jsx";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (
      <Navbar fluid>
        <Navbar.Header>
          <Navbar.Brand>
         
            <button className="button_menue"  onClick={this.mobileSidebarToggle} ><i class="fa fa-bars" aria-hidden="true"></i></button>
            
            <a href="#pablo" className="text_site">{this.props.brandText} Pasa <i class="fa fa-leaf" aria-hidden="true"></i></a>
            
          </Navbar.Brand>
          {/* <Navbar.Toggle onClick={this.mobileSidebarToggle} /> */}
        </Navbar.Header>
       
      </Navbar>
    );
  }
}

export default Header;
