import {v4} from  'uuid'
import {redis} from '../redis'

export const emailConfirmLink = async(userId: string) =>{
    const id = v4();
    await redis.set(id, userId, 'EX', 60*60*15);
    return `http://localhost:3000/users/confirm/${id}`

}