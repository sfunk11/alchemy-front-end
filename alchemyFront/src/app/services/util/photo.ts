export interface Photo {
  photoId: string;
  title:string;
  description: string; //
  file: File, //
  imageFileName: string, //
  uploader: string; //email is logger id
  isApproved:boolean
}
