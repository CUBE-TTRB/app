import {CommentsType} from "./Comments.type";

export type ResourceType ={
    id:string;
    title:string;
    visibility:string;
    type:string;
    ops:[{ insert:string}]
    Comments:CommentsType[];
}
