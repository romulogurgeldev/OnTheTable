import * as bcrypt from 'bcryptjs'


export function encodedPassword(password: string){
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT)
}

export function comparePassword(rawPassword: string, hash: string){
    return bcrypt.compareSync(rawPassword, hash);
}

export function createCode(){
    const length = 6;
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}