import {combineReducers} from "redux";
import Collection from "./collection";
import Management from "./management";
import Logistic from "./logistic";
import Alert from "./alert";
import Quality from "./quality";
import Sales from "./sales";
import Operations from "./operations";
import Production from "./production";
import Auth from "./auth";
import Finance from "./finances";


export default combineReducers({
    Collection, Management, Logistic, Alert, Quality, Sales, Operations, Production, Auth, Finance

});
