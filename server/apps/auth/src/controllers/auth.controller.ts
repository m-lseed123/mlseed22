import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Headers } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../models/users/dtos/create-user.dto';
import { UserLoginDto } from '../models/users/dtos/user-login.dto';
import { Unprotected } from '@app/common/decorators/routes.decorator';
import { JwtGuard } from '@app/common/guards/jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Unprotected()
  @Post('user/sign-up')
  async register(@Body() payload: CreateUserDto) {
    return this.authService.createUser(payload);
  }

  @Get('user/info')
  // @UseGuards(JwtGuard)
  async getUser(@Headers('Authorization') auth: string) {
    return this.authService.getUser(auth);
  }

  @Unprotected()
  @Post('auth/log-in')
  async login(@Body() payload: UserLoginDto) {
    return this.authService.loginUser(payload);
  }
}
