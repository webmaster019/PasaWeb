
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";
import avatar from "assets/img/default-avatar.png";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

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
          }
        }
      ]
    })



  }

  render() {
 
    return (
      <div
        id="sidebar"
        className="sidebar"
      >
          
        <div className="logo">
          <a
            href="./dashboard"
            className=" titre_logo"
          >
            Pasa <i class="fa fa-leaf" aria-hidden="true"></i>

          </a>
        </div>
        <div className="sidebar-wrapper">
          <div className="container col ">
         
               <img src={avatar} alt="AVATAR" className=" image_sidbar   " />
          </div>
          <div className="div_text_sid ">
            <h6 className="text_side">{window.sessionStorage.getItem("nameUser")}</h6>
             <button onClick={this.logOut}><i className="fa fa-sign-out" />Log out</button>
          </div>
          <ul className="nav_sid ">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if (!prop.redirect)
                return (
                  <li
                    className={
                      " li_link_sidbar"+
                      prop.upgrade
                        ? "active active-pro"
                        : this.activeRoute(prop.layout + prop.path)
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="link_sidbar row "
                      activeClassName="active"
                    
                    >
                      <i className={prop.icon+"  inc"} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              return null;
            })}
          </ul>
         
        </div>
      </div>
    );
  }
}

export default Sidebar;
