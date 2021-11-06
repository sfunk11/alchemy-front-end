import { User } from "./user";

export interface Photo {
  photoId: string;
  title:string;
  description: string; //
  file: File, //
  imageFileName: string, //
  uploader: User;
  isApproved:boolean
}
