import axios from "axios";
import jwtDecode from "jwt-decode";

const setAuthToken = token => {
    if(token && isTokenValid(token)){
        axios.defaults.headers.common["Authorization"] = token;
    }else{
        delete axios.defaults.headers.common["Authorization"];
    }
}

const isTokenValid = (token) => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        return false;
      } else{
        return true;
      }
    } else{
      return false;
    }
  };

export default setAuthToken;