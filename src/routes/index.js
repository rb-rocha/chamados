import { Switch } from "react-router-dom";
import Route from "./Routes";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashnboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import Chamados from "../pages/Chamados";


export default function Routes(){

    return(
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/dashboard" component={Dashnboard} isPrivate />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/profile" component={Profile} isPrivate/>
            <Route exact path="/customers" component={Customers} isPrivate/>
            <Route exact path="/chamados" component={Chamados} isPrivate/>
            <Route exact path="/chamados/:id" component={Chamados} isPrivate/>
        </Switch>
    );
}