export class PhotoData 
{
    // SHROTCUT TO TRADITIONAL CREATING VARIABLES ABOVE CONSTRUCTOR
    // THEN PASSING PARAMETERS IN CONSTRUCTOR
    // AND FINALLY SETTING THOSE PARAMETERS TO PRIVATE VARIABLES
    constructor
    (
        public description: string, //
        // public file: File, //
        public imageFileName: string, //
        public uploader: string //email is logger id
        
    )
    {}
}
