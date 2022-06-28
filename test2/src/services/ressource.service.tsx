import axios from "axios";
import authHeader from "./auth-header";
import { useContext, useState } from "react";


const API_URL = "https://api-cube.remidurieu.dev/resources/";



export const getPublicResources = () => {
  return axios.get(API_URL);
};

const deleteResources = (id) => {
  return axios.delete(API_URL+id)
}

const updateResources = (id, visibility, title, body, categoryId) => {
  return axios.patch(API_URL+id,{
    "resource": { "visibility":visibility,
      "title":title,
      "body":body,
      "categoryId":categoryId
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
