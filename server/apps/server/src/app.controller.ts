import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from '@app/common/guards/jwt.guard';
import { JwtEntity } from '@app/common/constants/types/jwt.type';
import { DecodedUser } from '@app/common/decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @UseGuards(JwtGuard)
  getHello(@DecodedUser() decodedUser: JwtEntity) {
    return this.appService.getHello(decodedUser);
  }
}
