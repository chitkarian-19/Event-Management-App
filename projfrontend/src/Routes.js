import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom";
import EventCreation from './admin/EventCreation';
import Login from './admin/Login';
import Signup from './admin/Signup';
import { signout } from './auth/helper';
import Event from './core/Event';
import Home from "./core/Home";
import UserDashBoard from './core/UserDashBoard';
import AdminDashBoard from './core/AdminDashBoard';
import AdminRoute from './auth/helper/AdminRoute'
import PrivateRoute from './auth/helper/PrivateRoute'


const Routes = () =>{
    return(
        <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/watch" exact component={Event}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/signup" exact component={Signup}/>
              <Route path="/signout" component={signout}/>
              <PrivateRoute path="/userDashBoard" component={UserDashBoard}/>
              <AdminRoute path="/adminDashBoard" component={AdminDashBoard}/>
              <AdminRoute path="/creation" component={EventCreation}/>
          </Switch>
        </BrowserRouter>
    );
}

export default Routes;