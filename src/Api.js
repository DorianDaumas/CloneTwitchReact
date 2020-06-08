import axios from "axios"

let api = axios.create({
    headers:{
        'Client-ID' : 'dqpw7npy8xuvxnjlhp674xypdou87b',
        'client_secret': '88con2xxgwokcr7cpq9elvxtfv3eeb',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'token_type': 'bearer'
}


});   

      export default api;


 


