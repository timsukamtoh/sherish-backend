// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(
    username: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    imageUrl?: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      image_url: imageUrl,
    });
    return this.usersRepository.save(newUser);
  }

  async findOrCreateUserFromGoogle(profile: any): Promise<User> {
    let user = await this.findOneByEmail(profile.emails[0].value);
    if (!user) {
      user = await this.createUser(
        profile.id,
        profile.emails[0].value,
        '', // No password for Google users
        profile.name.givenName,
        profile.name.familyName,
        profile.photos[0].value,
      );
    }
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { user_id: id } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
