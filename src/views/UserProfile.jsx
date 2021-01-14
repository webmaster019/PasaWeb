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
import {Api_route} from '../components/baseApi'
import axios from 'axios';


class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
        change_panel:false,
        dataSource:[]
    }
    this.email=null;
  this.name=null;
  this.password=null;
  this.confirm_password=null;
  this.phone=null;
  this.role=null;
 


  }
  change_panel(etat){
    this.setState({change_panel:etat});
  }


  Get_user_from_api() {
   

    const url = "users?page=0&size=4"
    fetch(Api_route(url))
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource:responseJson.content,
        })

      })
      .catch((error) => {

        console.log(error)
       
      })



  }

  componentDidMount() {
   this.Get_user_from_api();
  }



  render() {

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

                  <Form>
                    <Form.Group controlId="formnom">
                      <Form.Label>Nom complet :</Form.Label>
                      <Form.Control type="text" placeholder="Enter le mon complet" />
                    </Form.Group>

                    <Form.Group controlId="foremail">
                      <Form.Label>Email :</Form.Label>
                      <Form.Control type="text" placeholder="Enter le email" />
                    </Form.Group>

                    <Form.Group controlId="forphone">
                      <Form.Label>Numéro de téléphone :</Form.Label>
                      <Form.Control type="tel" placeholder="le Numéro de téléphone " />
                    </Form.Group>

                    <Form.Group controlId="forpss">
                      <Form.Label>Mot de pass:</Form.Label>
                      <Form.Control type="password" placeholder="Mot de pass " />
                    </Form.Group>
                    <Form.Group controlId="forpss">
                      <Form.Label>Confirmer le mot de pass:</Form.Label>
                      <Form.Control type="password" placeholder="Confirmer le mot de pass " />
                    </Form.Group>




                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Role</Form.Label>
                      <Form.Control as="select">
                        <option>admin</option>
                        <option>agent</option>

                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                      Enregistrer
                     </Button>
                     <Button variant="danger" type="button" className="btn_margin" onClick={()=>{this.change_panel(false)}}>
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
        <div className="container">
        <Col md={3}>
        <Button className="bg_site color_wt border_none" onClick={()=>{this.change_panel(true)}}>Ajouter un agent</Button>
        </Col>
        <Col md={7}>
        <Form className="form_recherche col-lg-12"> 
       <Form.Control  type="text col-lg-9" placeholder="Enter le nom à rechercher"/>
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
                          <tr  key={key}>
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
