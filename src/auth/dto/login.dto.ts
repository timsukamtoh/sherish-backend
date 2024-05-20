//src/auth/dto/login.dto.ts
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()  
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
