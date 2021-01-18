
import React, { Component } from "react";
import "assets/css/customcss.css"
import "assets/css/light-bootstrap-dashboard-react.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "assets/css/animate.min.css";
import "assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "assets/css/demo.css";
import "assets/css/pe-icon-7-stroke.css";
import avatar from "assets/img/default-avatar.png"
import { Api_route } from '../components/baseApi'
import axios from 'axios';
import Spinner from 'react-spinner-material';
//import Badge from 'react-bootstrap/Badge'
import 'materialize-css';
import { confirmAlert } from 'react-confirm-alert';
class Login extends Component {


  constructor() {
    super()
    this.state = {
      isload_data: false,
      username: null,
      password: null,
      showErreur: false,
      message: null,
    }

  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  changeLoaderVisiblility(visible) {
    this.setState({
      isload_data: visible
    });
  }


  submitHandeler = e => {
    e.preventDefault();

    const { username, password } = this.state;
    let Body = {
      "username": username,
      "password": password,

    };
    if (password != null && password != null) {
      this.changeLoaderVisiblility(true);
      axios.post(Api_route("users/login"), Body)
        .then(response => {

          this.changeLoaderVisiblility(false);
          if (response.data.role === "ADMIN" && response.data.enabled) {
            console.log("data", response.data);
            window.location.href="/admin/dashboard";

            window.sessionStorage.setItem("nameUser",response.data.name);
            window.sessionStorage.setItem("emailUser",response.data.email);
            window.sessionStorage.setItem("userID",response.data.id);
            window.sessionStorage.setItem("roleUser",response.data.role);
            window.sessionStorage.setItem("rolephone",response.data.phone);
           




          } else {
            confirmAlert({
              title: 'Rejeter ',
              message: "L'utilisateur n'est pas autorisé à accéder à cet site",
              buttons: [
                {
                  label: 'Réessayer',
                  onClick: () => this.setState({
                    is_createuser: false
                  })
                }
              ]
            })

          }

          console.log("role", response.data.role);



        })
        .catch(error => {
          // console.log("erreur",error.response.data);
          // alert(error.response.data.message);
          this.changeLoaderVisiblility(false);
          confirmAlert({
            title: 'Rejeter',
            message: error.response.data,
            buttons: [
              {
                label: 'Réessayer',
                onClick: () => this.setState({
                  is_createuser: false
                })
              }
            ]
          })



        })
    } else {
      confirmAlert({
        title: 'Erreur',
        message: "Mot de pass ou nom d'utilisateur est vide ",
        buttons: [
          {
            label: 'Réessayer',
            onClick: () => this.setState({
              is_createuser: false
            })
          }
        ]
      })
    }

  }


  render() {

    const { username, password } = this.state;
    return (

      <div className="limiter">
        <div className="container-login100 bg_site" >
          <div className="wrap-login100 p-t-50 p-b-3 bg_wt">
            <div className="logoLogin ">
              <h2 className="titre_logo2">
                PASA<i className="fa fa-leaf" aria-hidden="true"></i>
              </h2>
              <p>
                Dashboard
            </p>
            </div>
            <form className="login100-form validate-form" onSubmit={this.submitHandeler}>
              <div class="login100-form-avatar">
                <img src={avatar} alt="AVATAR" />
              </div>

              <span className="login100-form-title p-t-20 p-b-45">
                Connectez-vous!
            </span>
              <div className="loader ">
                <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={this.state.isload_data} />
              </div>
              <div className="wrap-input100 validate-input m-b-10 m-t-10" >
                <input className="input100" type="text" name="username"
                  placeholder="Entrez nom d'utilisateur"
                  value={username}
                  onChange={this.changeHandler}

                />
                <span className="focus-input100"></span>
                <span className="symbol-input100">
                  <i className="fa fa-user"></i>
                </span>
              </div>

              <div className="wrap-input100 validate-input m-b-10" >
                <input className="input100" type="password"
                  name="password" placeholder="Entrez Mot de pass"
                  value={password}
                  onChange={this.changeHandler}
                />
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
