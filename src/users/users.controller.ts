// src/users/users.controller.ts
import {
    Controller,
    Post,
    Get,
    Res,
    Body,
    UseGuards,
    HttpStatus,
    Param,
    Patch
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { User } from './user.entity';
  import { Response } from 'express';
  import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  
  @Controller('users')
  export class UsersController {
    constructor(private usersService: UsersService) {}
  
    @Post()
    async createUser(
      @Body()
      userData: {
        username: string;
        email: string;
        password: string;
        firstName?: string;
        lastName?: string;
        imageUrl?: string;
      },
    ): Promise<User> {
      return this.usersService.createUser(
        userData.username,
        userData.email,
        userData.password,
        userData.firstName,
        userData.lastName,
        userData.imageUrl,
      );
    }
  
    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    async getUser(@Param('id') id: string, @Res() res: Response) {
      const userId = parseInt(id);
      if (isNaN(userId)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid user ID' });
      }
      try {
        const user = await this.usersService.findById(userId);
        return res.status(HttpStatus.OK).json(user); // HttpStatus.OK es 200
      } catch (error) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found' }); // HttpStatus.NOT_FOUND es 404
      }
    }
  }
  