import axios from "axios";
import authHeader from "./auth-header";
import { useContext, useState } from "react";


const API_URL = "https://api-cube.remidurieu.dev/comments/";



const getAllComment= () => {
  return axios.get(API_URL);
};
const postComment= (resourceId,parentCommentId,text) =>{
  return axios.post(API_URL,{
    "comment": {
      "resourceId": resourceId,
      "parentCommentId": parentCommentId,
      "text":text
    }
  })
};

const deleteComment = (id) => {
  return axios.delete(API_URL+id)
}

const updateComment = (id, resourceId, parentCommentId,text) => {
  return axios.patch(API_URL+id, {
    "comment":{
      "resourceId":resourceId,
      "parentCommentId": parentCommentId,
      "text":text
    }
  })
}




const ResourcesService ={
  getAllComment,
  updateComment,
  deleteComment,

};

export default ResourcesService;
