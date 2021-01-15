import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table,

} from "react-bootstrap";
import Form from 'react-bootstrap/Form'

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
// import Button from "components/CustomButton/CustomButton.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import "assets/css/customcss.css";
import Button from 'react-bootstrap/Button';
import { Api_route } from '../components/baseApi'
import axios from 'axios';
import Spinner from 'react-spinner-material';

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
      conf_password:null,
    }
 



  }
  change_panel(etat) {
    this.setState({ change_panel: etat,
      email: null,
      name: null,
      password: null,
      phone: null,
      role: "AGENT",
      conf_password:null,
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
        })

      })
      .catch((error) => {

        console.log(error)

      })



  }

  componentDidMount() {
    this.Get_user_from_api();
  }
  
  changeHandler=e =>{
    this.setState({[e.target.name]:e.target.value});
  }
  submitHandeler= e =>{
    e.preventDefault();
    const {email,name,password,phone,role, conf_password}=this.state;
    let Body={
      "email":email,
      "name":name,
      "password":password,
      "phone":phone,
      "role":role

    };
    axios.post(Api_route("users?userId=1"),Body)
    .then(response =>{
      this.Get_user_from_api();
      console.log(response);
    })
    .catch(error=>{
      console.log(error);
    })

  }

  render() {
    const {email,name,password,phone,role, conf_password}=this.state;

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
                        <Button variant="primary" type="submit" >
                          Enregistrer
                     </Button>
                        <Button variant="danger" type="button" className="btn_margin" onClick={() => { this.change_panel(false) }}>
                          Annuler
                     </Button>

                      </Form>

                    }
                  />
                </Col>
              </Row>
            </Grid>
            :

            <>


              <Grid fluid>


                <Row>
                  <Col md={12}>

                    <Card
                      title={null}
                      category=""
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                        <div className="content">
                          <Col md={3}>
                            <Button className="bg_site color_wt border_none" onClick={() => { this.change_panel(true) }}>Ajouter un agent</Button>
                          </Col>
                          <Col md={7}>
                            <Form className="form_recherche col-lg-12">
                              <Form.Control type="text col-lg-9" placeholder="Enter le nom à rechercher" />
                            </Form>
                          </Col>
                        </div>
                      }
                    />
                  </Col>
                </Row>
              </Grid>


     


              <Grid fluid>


                <Row>
                  <Col md={12}>

                    <Card
                      title="List des agents"
                      category=""
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                        <>
                       
                          <Table striped hover>
                            <thead>
                              <tr>
                                <th >NOM COMPLET</th>
                                {/* <th >NUMERO DE TELEEPHONE</th> */}
                                <th >EMAIL</th>
                                <th>ROLE</th>
                                <th>DATE DE CREATION</th>
                                <th>DATE DE MODIFICATION</th>
                              </tr>
                            </thead>

                            <tbody>
                         
                              {this.state.dataSource.map((data, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{data.name}</td>
                                    {/* <td>{data.phone}</td> */}
                                    <td>{data.email}</td>
                                    <td>{data.role}</td>
                                    <td>{data.creationDate}</td>
                                    <td>{data.updateDate}</td>
                                  </tr>
                                );
                              })}
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
