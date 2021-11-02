export interface Photo {
  photoId: string;
  title:string;
  description: string;
  file: File,
  imageFileName: string,
  uploader: string;
  isApproved:boolean
}
