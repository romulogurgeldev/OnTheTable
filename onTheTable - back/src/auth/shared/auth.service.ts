import { comparePassword } from 'src/utils/bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../../users/users.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService,){

    }
    async validateUser(userEmail: string, userPassword: string, telefone: string) {
      console.log(userEmail)
        const user = userEmail.includes('@') ? await this.usersService.findByEmailPassword(userEmail) : await this.usersService.findByTelefonePassword(userEmail);
        if (user && comparePassword(userPassword, user.password)) {
          const { _id, name, email, category, telefone } = user;
          return { id: _id, name, email, category, telefone };
        }
    
        return null;
    }
    async login(user: any) {
      console.log("login", user)
      const payload = { email: user.email, sub: user.id, name: user.name, category: user.category, telefone: user.telefone };
      return {
        access_token: this.jwtService.sign(payload),

      };
    }
}
