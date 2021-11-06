import { User } from "./user";

export interface Photo {
  id?:number,
  photoId: number;
  title:string;
  description: string; //
  file: File, //
  imageFileName: string, //
  uploader: User;
  isApproved:boolean,
  url?:string
}
