// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (!existingUser) {
      throw new UnauthorizedException('User not found.');
    }

    if (
      existingUser.password &&
      !(await bcrypt.compare(password, existingUser.password))
    ) {
      throw new UnauthorizedException('Credentials are invalid.');
    }

    const payload = { email: existingUser.email, sub: existingUser.user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }


  async validateOAuthLogin(
    profile: any,
  ): Promise<{ user: User; access_token: string }> {
    const user = await this.usersService.findOrCreateUserFromGoogle(profile);
    const payload = { email: user.email, sub: user.user_id };
    return {
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  
}
