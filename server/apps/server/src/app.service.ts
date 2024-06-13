import { JwtEntity } from '@app/common/constants/types/jwt.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(user: JwtEntity) {
    return {
      message: `Hello ${user.email}`,
    };
  }
}
