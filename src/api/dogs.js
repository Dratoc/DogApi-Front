import { basePath } from "./config";

export function getAllDogs(){

    const url = `${basePath}/breeds/list/all`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    return fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => {return result})
    .catch(error => {return { message: `error del servicio : ${error.message}` }});

} 