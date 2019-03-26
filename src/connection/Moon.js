import axios from 'axios'
import API_URI from './serverConfig'

const apiURL = API_URI;
console.log('apiurl => '+apiURL);

export default class Moon{



    get(endpoint, options = null){

        console.log("🌝");

        const server_uri = `${apiURL}/${endpoint}`;

        return axios.get(server_uri, options);
    }

    post(endpoint = "", data = {}, options = {headers: {
            'Content-Type': 'application/json'
        }}){


        const server_uri = `${apiURL}/${endpoint}`;

        return axios.post(server_uri, data, options);
    }

    put(endpoint = "", data = {}, options = {headers: {
            'Content-Type': 'application/json'
        }}){


        const server_uri = `${apiURL}/${endpoint}`;

        return axios.put(server_uri, data, options);
    }

    delete(endpoint = "", options = null){

        const server_uri = `${apiURL}/${endpoint}`;

        return axios.delete(server_uri,options);
    }


}

//connect to database