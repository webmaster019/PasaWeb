import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,

} from "react-bootstrap";
import Form from 'react-bootstrap/Form'

import { Card } from "components/Card/Card.jsx";

import "assets/css/customcss.css";
import Button from 'react-bootstrap/Button'
import { Api_route } from '../components/baseApi'
import axios from 'axios';
import Spinner from 'react-spinner-material';
//import Badge from 'react-bootstrap/Badge'
import 'materialize-css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      change_panel: false,
      dataSource: [],
      isload_data: true,
      email: null,
      name: null,
      password: null,
      phone: null,
      role: "AGENT",
      conf_password: null,
      modalShow: false,
      idUser: null,
      is_createuser: false,
    }

  }

  change_panel(etat) {
    this.setState({
      change_panel: etat,
      email: null,
      name: null,
      password: null,
      phone: null,
      role: "AGENT",
      conf_password: null,
    });
  }


  Get_user_from_api() {


    const url = "users?page=0&size=4"
    fetch(Api_route(url))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.content,
          isload_data: false,
          modalShow: false,
          idUser: null,
          is_createuser: false,
        })
        console.log(responseJson);

      })
      .catch((error) => {

        console.log(error)

      })




  }
  componentWillUnmount() {
    this.setState({
      change_panel: false,
      dataSource: [],
      isload_data: true,
      email: null,
      name: null,
      password: null,
      phone: null,
      role: "AGENT",
      conf_password: null,
      modalShow: false,
      idUser: null,
      is_createuser: false,
    });
  }

  componentDidMount() {
    this.Get_user_from_api();
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitHandeler = e => {
    e.preventDefault();

    const { email, name, password, phone, role, conf_password } = this.state;
    let Body = {
      "email": email,
      "name": name,
      "password": password,
      "phone": phone,
      "role": role

    };
    if (password === conf_password) {
      this.setState({
        is_createuser: true
      });
      axios.post(Api_route("users?userId=" + window.sessionStorage.getItem("userID")), Body)
        .then(response => {

          // console.log(response);
          confirmAlert({
            title: 'Succés',
            message: "Enregistré avec succés",
            buttons: [
              {
                label: 'ok',
                onClick: () => {
                  this.setState({
                    email: null,
                    name: null,
                    password: null,
                    phone: null,
                    role: "AGENT",
                    conf_password: null,
                  }, this.Get_user_from_api());

                }
              }
            ]
          })


        })
        .catch(error => {
          // console.log(error.response.data.message);
          // alert(error.response.data.message);

          confirmAlert({
            title: 'Erreur',
            message: error.response.data.message,
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
        message: "Mot de pass non idendique",
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

  changeEtatuserHandeler(idUser) {
    if (idUser) {
      axios.patch(Api_route("users/disable-user?adminId=" + window.sessionStorage.getItem("userID") + "&userId=" + idUser))
        .then(response => {

          console.log(response);
          confirmAlert({
            title: 'Succés',
            message: "Effectué avec succés",
            buttons: [
              {
                label: 'ok',
                onClick: () => {
                  this.Get_user_from_api();

                }
              }
            ]
          })
        })
        .catch(error => {
          confirmAlert({
            title: 'Erreur',
            message: error.response.data.message,
            buttons: [
              {
                label: 'Réessayer',
                onClick: () => this.setState({
                  is_createuser: false
                })
              }
            ]
          });
        })
    }
  }

  deleteHandeler(idUser) {
    if (idUser) {
      axios.delete(Api_route("users/" + idUser))
        .then(response => {

          console.log(response);

          confirmAlert({
            title: 'Succés',
            message: "Supprimé avec succés",
            buttons: [
              {
                label: 'ok',
                onClick: () => {
                  this.Get_user_from_api();;

                }
              }
            ]
          })
        })
        .catch(error => {
          confirmAlert({
            title: 'Erreur',
            message: error.response.data.message,
            buttons: [
              {
                label: 'Réessayer',
                onClick: () => this.setState({
                  is_createuser: false
                })
              }
            ]
          });
        })
    }
  }
  modalEvent(event, id) {
    this.setState({
      modalShow: event,
      idUser: id,
    });
  }
  render() {
    const { email, name, password, phone, role, conf_password } = this.state;
    // console.log(this.state.dataSource);


    return (

      <div className="content">




        {
          this.state.change_panel
            ?


            <Grid fluid>
              <Row>
                <Col md={12}>

                  <Card
                    title="Ajouter Un utilisateur"
                    content={

                      <Form onSubmit={this.submitHandeler}>


                        <Form.Group controlId="formnom">
                          <Form.Label>Nom complet :</Form.Label>
                          <Form.Control type="text" placeholder="Enter le mon complet" name="name" required value={name} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="foremail">
                          <Form.Label>Email :</Form.Label>
                          <Form.Control type="email" placeholder="Enter le email" name="email" required value={email} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="forphone">
                          <Form.Label>Numéro de téléphone :</Form.Label>
                          <Form.Control type="tel" placeholder="le Numéro de téléphone " name="phone" required value={phone} onChange={this.changeHandler} />
                        </Form.Group>

                        <Form.Group controlId="forpss">
                          <Form.Label>Mot de pass:</Form.Label>
                          <Form.Control type="password" placeholder="Mot de pass " name="password" required value={password} onChange={this.changeHandler} />
                        </Form.Group>
                        <Form.Group controlId="forpss">
                          <Form.Label>Confirmer le mot de pass:</Form.Label>
                          <Form.Control type="password" placeholder="Confirmer le mot de pass " name="conf_password" required value={conf_password} onChange={this.changeHandler} />
                        </Form.Group>




                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Role</Form.Label>
                          <Form.Control as="select" name="role" value={role} onChange={this.changeHandler} >
                            <option value="AGENT"  >AGENT</option>
                            <option value="ADMIN">ADMIN</option>

                          </Form.Control>
                        </Form.Group>
                        {
                          !this.state.is_createuser
                            ?
                            <>
                              <Button variant="primary" type="submit" >
                                Enregistrer
                             </Button>
                              <Button variant="danger" type="button" className="btn_margin" onClick={() => { this.change_panel(false) }}>
                                QUITTER
                             </Button>

                            </>
                            :
                            <div className="loader">
                              <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={true} />
                            </div>

                        }

                      </Form>

                    }
                  />
                </Col>
              </Row>
            </Grid>
            :

            <>


              <div className=" p-b-1 m-b-10">
                <Col md={3}>
                  <button className="bg_site btn  btn_site" onClick={() => { this.change_panel(true) }}><i className="fa fa-plus-circle"></i></button>
                </Col>

              </div>





              <Grid fluid>


                <Row>
                  <Col md={12}>

                    <Card
                      title="List des agents"
                      category=""
                      ctTableFullWidth
                      // ctTableResponsive
                      content={
                        <>

                          <Table striped responsive hover>
                            <thead>
                              <tr>
                                <th >NOM COMPLET</th>
                                <th >NUMERO DE TELEEPHONE</th>
                                <th >EMAIL</th>
                                <th>ROLE</th>
                                <th>ETAT</th>
                                <th>DATE DE CREATION</th>
                                {/* <th>DATE DE MODIFICATION</th> */}
                                <th></th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>

                              {
                                this.state.dataSource
                                  ?
                                  this.state.dataSource.map((data, key) => {
                                    return (
                                      <tr key={key}>
                                        <td>{data.name}</td>
                                        <td>{data.phone ? data.phone : "pas de numéro"}</td>
                                        <td>{data.email}</td>
                                        <td><span className={data.role === "ADMIN" ? "etat bg_site" : null}>{data.role} </span></td>
                                        <td>
                                          {/* <Badge pill variant="primary">
                                        Info
                                      </Badge>{''} */
                                          }
                                          <span className={data.enabled ? "etat bg_site" : "etat bg_danger"}>{data.enabled ? "ACTIVÉ" : "DESACTIVÉ"} </span>
                                        </td>
                                        <td>{data.creationDate}</td>
                                        {/* <td>{data.updateDate}</td> */}
                                        {/* <td><Button variant={data.enabled?"danger":"primary"}>{data.enabled?"ACTIVER":"DESACTIVER"}</Button></td>  */}
                                        {
                                          this.state.modalShow && this.state.idUser === data.id
                                            ?
                                            null
                                            :
                                            <td> <button className={data.enabled ? "bg_danger btn  btn_site" : "bg_site btn  btn_site"} onClick={() => {
                                              this.setState({
                                                isload_data: true
                                              }, this.changeEtatuserHandeler(data.id));
                                            }}  >{data.enabled ? "DESACTIVER" : "REACTIVER"}</button></td>

                                        }
                                        <td>
                                          {
                                            this.state.modalShow && this.state.idUser === data.id
                                              ?
                                              <>
                                                <p>Supprimer cet agent?</p>
                                                <p><button className="text-danger"
                                                  onClick={() => {
                                                    this.setState({
                                                      isload_data: true
                                                    }, this.deleteHandeler(data.id));
                                                  }}
                                                >oui</button>
                                                  <button className="text-primary"
                                                    onClick={() => {
                                                      this.modalEvent(false, null);
                                                    }}
                                                  >non</button></p>

                                              </>
                                              :
                                              <button className="bg_danger btn  btn_site"
                                                onClick={() => {
                                                  this.modalEvent(true, data.id);
                                                }}
                                              ><i className="fa fa-trash"></i></button>


                                          }
                                        </td>
                                      </tr>
                                    );
                                  })
                                  :
                                  null
                              }
                            </tbody>
                          </Table>
                          <div className="loader">
                            <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={this.state.isload_data} />
                          </div>
                        </>
                      }
                    />
                  </Col>
                </Row>
              </Grid>

            </>
        }




      </div>
    );
  }
}

export default UserProfile;
