export const imageFilter = (req: any, file: any, callback: any) =>{
    if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)){
        return callback(null, false);
    }
    callback(null, true);
}