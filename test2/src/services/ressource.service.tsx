import axios from "axios";
import authHeader from "./auth-header";
import { useContext, useState } from "react";


const API_URL = "https://api-cube.remidurieu.dev/resources";



export const getPublicResources = () => {
  return axios.get(API_URL);
};

const deleteResources = (id) => {
  return axios.delete(API_URL+id)
}

const updateResources = (id,type, visibility, title, body, categoryId) => {
  return axios.patch(API_URL+id,{
    "resource": { "type":type,"visibility":visibility,
      "title":title,
      "body":body,
      "categoryId":categoryId
    }
  })
}
export const addRessources = (type,visibility,title,body) => {
  return axios.post(API_URL,{
    "resource":{
      "type":type,
      "visibility":visibility,
      "title":title,
      "body":body
    }
  })
}

const getAResources = (id) => {
  return axios.get(API_URL+id)
}


const ResourcesService ={
  getPublicResources,
  updateResources,
  getAResources,
  deleteResources,

};

export default ResourcesService;
