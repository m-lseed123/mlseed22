// import { JwtDecodedEntity } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateAccessToken(payload: {
    userId: string;
    email: string;
  }): Promise<string> {
    const { userId, email } = payload;

    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: 'SECRET',
        expiresIn: '1h',
        // secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        // expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE'),
      },
    );

    return accessToken;
  }

  verifyToken(token: string): any {
    const decoded = this.jwtService.verify(token, {
      secret: 'SECRET',
      // secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    });

    if (!decoded) return null;

    return {
      userId: decoded.sub,
      email: decoded.email,
    };
  }
}
