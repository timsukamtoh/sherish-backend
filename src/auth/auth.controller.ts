import {
    Controller,
    Get,
    UseGuards,
    Req,
    Res,
    Post,
    Body,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Request, Response } from 'express';
  import { AuthService } from './auth.service';
  import { LoginDto } from './dto/login.dto';
  import { JwtAuthGuard } from './jwt-auth.guard';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
      return this.authService.login(loginDto.email, loginDto.password);
    }
  
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: Request): Promise<void> {}
  
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
      if (req.user && 'jwt' in req.user) {
        console.log(req.user);
        console.log('Redirecting to profile with JWT', req.user.jwt);
  
        // Asegúrate de que req.user es del tipo adecuado
        const user = req.user as { jwt: string };
  
        const redirectUrl = new URL(`${process.env.DOMAINF}/`);
        redirectUrl.searchParams.append('token', user.jwt);
  
        res.redirect(redirectUrl.toString());
      } else {
        console.log('Authentication failed, redirecting to login');
        res.redirect('/login?error=authentication');
      }
    }
  
    @Get('verify')
    @UseGuards(JwtAuthGuard)
    async verifySession(
      @Req() req: Request,
      @Res() res: Response,
    ): Promise<Response> {
      // Asegúrate de que req.user contiene la propiedad userId que necesitas
      const user = req.user as any; // Tipo más específico si es posible
      if (user && user.userId) {
        return res.status(HttpStatus.OK).json({
          isAuthenticated: true,
          userId: user.userId, // Envía el userId al cliente
        });
      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          isAuthenticated: false,
          message: 'User not authenticated',
        });
      }
    }
  
    @Get('logout')
    logout(@Res() res: Response) {
      return res.status(HttpStatus.OK).json({ message: 'Logout successful' });
    }
  }
  