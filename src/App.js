import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.jsx";
import Login from "views/login";
import 'react-confirm-alert/src/react-confirm-alert.css'


const App = (props) => {

  return (

    <BrowserRouter>
   
     { 
     window.sessionStorage.getItem("userID") && window.sessionStorage.getItem("roleUser")==="ADMIN"
     ?
     <Switch>
         <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
      <Redirect from="/admin" to="/admin/dashboard" />
      </Switch>
     :
     <Switch>
         <Route path="*" render={props => <Login {...props} />} />

     </Switch>
      
     

     
      }
     

  </BrowserRouter>
 
  );
};
 
export default App;