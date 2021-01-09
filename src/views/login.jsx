
import React, { Component } from "react";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Grid, Row, Col, Alert } from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import "assets/css/customcss.css"
import "assets/css/light-bootstrap-dashboard-react.css"
import avatar from "assets/img/default-avatar.png"


class Login extends Component {
  render() {
    return (
   
      <div className="limiter">
      <div className="container-login100 bg_site" >
        <div className="wrap-login100 p-t-50 p-b-3 bg_wt">
          <div className="logoLogin ">
            <h2 className="titre_logo2">
              PASA<i class="fa fa-leaf" aria-hidden="true"></i>
            </h2>
            <p>
              Dashboard
            </p>
          </div>
          <form className="login100-form validate-form">
            <div class="login100-form-avatar">
              <img src={avatar} alt="AVATAR"/>
            </div>
  
            <span className="login100-form-title p-t-20 p-b-45">
              Connectez-vous!
            </span>
  
            <div className="wrap-input100 validate-input m-b-10" >
              <input className="input100" type="text" name="username" placeholder="Entrez nom d'utilisateur"/>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-user"></i>
              </span>
            </div>
  
            <div className="wrap-input100 validate-input m-b-10" >
              <input className="input100" type="password" name="pass" placeholder="Entrez Mot de pass"/>
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock"></i>
              </span>
            </div>
  
            <div className="container-login100-form-btn p-t-10">
              <button className="login100-form-btn">
                Login
              </button>
            </div>
  
          </form>
        </div>
      </div>
    </div>
    
  

    );
  }
}

export default Login;
