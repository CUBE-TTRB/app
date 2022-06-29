import {CommentsType} from "./Comments.type";

export type ResourceType ={
    id:string;
    title:string;
    body:string;
    visibility:string;
    type:string;
    Comments:CommentsType[];
}