export interface Photo {
  photoId: string;
  title:string;
  description: string;
  file: File,
  folderName: string,
  uploader: string;
  isApproved:boolean
}
