import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Req()
    request: Request,
    @Res()
    response: Response,
    @Body()
    loginUserDto: LoginUserDto,
  ): Promise<any> {
    try {
      const result = this.authService.login(loginUserDto);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  @Post('/register')
  async register(
    @Req()
    request: Request,
    @Res()
    response: Response,
    @Body()
    registerUserDto: RegisterUserDto,
  ): Promise<any> {
    try {
      const result = await this.authService.register(registerUserDto);

      return response.status(200).json(result);
    } catch (error) {
      console.log('~~> error', error);

      return response.status(500).json({ error: error.message });
    }
  }
}
