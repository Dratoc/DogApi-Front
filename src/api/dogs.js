import { basePath } from "./config";

export function getAllDogsApi(){

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

export function getBreedImagesApi(breeds){

    const url = `${basePath}/breed/${breeds.toLowerCase()}/images`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {return result})
        .catch(error => {return { message: `error del servicio : ${error.message}` }});

}

export function getSubBreedImagesApi(breeds, subBreeds){

    const url = `${basePath}/breed/${breeds.toLowerCase()}/${subBreeds.toLowerCase()}/images`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {return result})
        .catch(error => {return { message: `error del servicio : ${error.message}` }});

}