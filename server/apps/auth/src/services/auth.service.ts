import { ValidateTokenResponse } from '@app/grpc/proto/auth';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenService } from './jwt.service';
import { UserService } from './user.service';
import { HashingService } from './hash.service';
import { CreateUserDto } from '../models/users/dtos/create-user.dto';
import { UserLoginDto } from '../models/users/dtos/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: TokenService,
    private readonly userService: UserService,
    private readonly hashService: HashingService,
  ) {}

  async getUser(token: string) {
    const bearer = token.split(' ')[1];
    const user = await this.validateUserToken(bearer);
    const { email, firstName, lastName, createdAt } =
      await this.userService.getUserByEmail(user.user.email);
    return { email, firstName, lastName, createdAt };
  }
  async createUser(payload: CreateUserDto) {
    const { email, password, ...rest } = payload;
    const exists = await this.userService.exists(email);

    if (exists) {
      throw new ConflictException('Email exists');
    }
    const hashedPass = await this.hashService.hash(password);
    const newUser = await this.userService.create({
      ...rest,
      email,
      password: hashedPass,
    });

    if (!newUser) {
      throw new Error('Error Creating User');
    }

    const jwtToken = await this.jwtService.generateAccessToken({
      userId: newUser.userId,
      email: newUser.email,
    });

    return {
      user: newUser.email,
      jwtToken,
    };
  }

  async loginUser(payload: UserLoginDto) {
    const user = await this.userService.findUser(payload.email);
    if (!user) {
      throw new NotFoundException('Wrong credentials');
    }

    const checkHashedPassword = await this.hashService.compare(
      user.password,
      payload.password,
    );

    if (!checkHashedPassword) {
      throw new NotFoundException('Wrong credentials');
    }

    const jwtToken = await this.jwtService.generateAccessToken({
      userId: user.userId,
      email: user.email,
    });

    return {
      user: user.email,
      jwtToken,
    };
  }

  async validateUserToken(token: string): Promise<ValidateTokenResponse> {
    if (!token) {
      return {
        empty: {},
      };
    }

    try {
      const decoded = this.jwtService.verifyToken(token);

      if (!decoded) {
        return {
          empty: {},
        };
      }

      return {
        user: {
          userId: decoded.userId,
          email: decoded.email,
        },
      };
    } catch (err) {
      return {
        empty: {},
      };
    }
  }
}
