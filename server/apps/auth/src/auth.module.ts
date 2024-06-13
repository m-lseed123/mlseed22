import { Module } from '@nestjs/common';
import { AuthGrpcController } from './controllers/auth.grpc.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/jwt.service';
import { HashingService } from './services/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { DatabaseModule } from '@app/common/db/database.module';
import { User } from '@app/common/db/schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({}),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthGrpcController, AuthController],
  providers: [AuthService, UserService, TokenService, HashingService],
})
export class AuthModule {}
