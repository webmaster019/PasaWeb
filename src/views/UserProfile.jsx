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


class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
        change_panel:false,
    }


  }
  change_panel(etat){
    this.setState({change_panel:etat});
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
                      <Form.Label>Nom :</Form.Label>
                      <Form.Control type="text" placeholder="Enter le mon" />
                    </Form.Group>

                    <Form.Group controlId="formnom">
                      <Form.Label>Postnom :</Form.Label>
                      <Form.Control type="text" placeholder="Enter le Postnom" />
                    </Form.Group>

                    <Form.Group controlId="formnom">
                      <Form.Label>Prenom :</Form.Label>
                      <Form.Control type="text" placeholder="Enter le Prenom" />
                    </Form.Group>

                    <Form.Group controlId="formnom">
                      <Form.Label>Numéro de téléphone :</Form.Label>
                      <Form.Control type="tel" placeholder="Enter le Numéro de téléphone " />
                    </Form.Group>




                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Sexe</Form.Label>
                      <Form.Control as="select">
                        <option>M</option>
                        <option>F</option>

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
                        {thArray.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {tdArray.map((prop, key) => {
                        return (
                          <tr key={key}>
                            {prop.map((prop, key) => {
                              return <td key={key}>{prop}</td>;
                            })}
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
