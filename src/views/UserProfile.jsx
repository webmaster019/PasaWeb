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


class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      change_panel: true,
      dataSource: [],
      isload_data: true,
      email: null,
      name: null,
      password: null,
      phone: null,
      role: "AGENT",
      conf_password: null,
      modalShow:false,
      idUser:null,
      is_createuser:false,
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
          modalShow:false,
          idUser:null,
          is_createuser:false,
        })
        //console.log(responseJson);

      })
      .catch((error) => {

        console.log(error)

      })




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
    axios.post(Api_route("users?userId=1"), Body)
      .then(response => {
        this.Get_user_from_api();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })

  }

  changeEtatuserHandeler(idUser){
    if(idUser){
      axios.patch(Api_route("users/disable-user?updatedBy=1&userId="+idUser))
      .then(response => {
        this.Get_user_from_api();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  deleteHandeler(idUser){
    if(idUser){
      axios.delete(Api_route("users/"+idUser))
      .then(response => {
        this.Get_user_from_api();
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
  modalEvent(event,id){
    this.setState({
      modalShow:event,
      idUser:id,
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

                      <Form onSubmit={()=>{
                        this.setState({
                          is_createuser:true
                        },this.submitHandeler);
                      }}>
                        
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
                      Annuler
                 </Button>
                 <div className="col-lg-12 bg_danger m-t-3" >
                   <span>message</span>
                 </div>
                 </>
                 :
                 <div className="loader">
                        <Spinner size={120} spinnerColor={"#333"} spinnerWidth={2} visible={this.state.isload_data} />
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
                                <th>ETAT</th>
                                <th>DATE DE CREATION</th>
                                <th>DATE DE MODIFICATION</th>
                                <th>ACTION</th>
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
                                    <td>
                                      {/* <Badge pill variant="primary">
                                        Info
                                      </Badge>{''} */
                                      }
                                      <span className={data.enabled?"etat bg_site":"etat bg_danger"}>{data.enabled?"ACTIVÉ":"DESACTIVÉ"} </span>
                                    </td>
                                    <td>{data.creationDate}</td>
                                    <td>{data.updateDate}</td>
                                   {/* <td><Button variant={data.enabled?"danger":"primary"}>{data.enabled?"ACTIVER":"DESACTIVER"}</Button></td>  */}
                                   <td> <button className={data.enabled?"bg_danger btn  btn_site":"bg_site btn  btn_site"} onClick={()=>{
                                     this.setState({
                                       isload_data:true
                                     },this.changeEtatuserHandeler(data.id));
                                   }}  >{data.enabled?"DESACTIVER":"REACTIVER"}</button></td>
                                   <td>
                                    {
                                      this.state.modalShow && this.state.idUser==data.id
                                      ?
                                      <div>
                                      <p>Etez-vous sûr de vouloir supprimer cet agent?</p>
                                      <p><button className="text-danger" 
                                      onClick={()=>{
                                        this.deleteHandeler(data.id);
                                      }}
                                      >oui</button>
                                      <button className="text-primary" 
                                       onClick={()=>{
                                        this.modalEvent(false,null);
                                      }}
                                      >non</button></p>

                                    </div>
                                      :
                                      <button className="bg_danger btn  btn_site" 
                                      onClick={()=>{
                                        this.modalEvent(true,data.id);
                                      }}
                                      >suprimer</button>
                                    
                                     
                                    }
                                    </td>
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
