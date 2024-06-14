import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  ValidateTokenResponse,
} from '@app/grpc/proto/auth';
import { ExtractJwt } from 'passport-jwt';
import {
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements OnModuleInit {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AUTH_SERVICE_NAME)
    private readonly client: ClientGrpc,
  ) {
    super();
  }
  private authServices: AuthServiceClient;
  onModuleInit() {
    this.authServices =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    try {
      // check if public
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        'unprotected',
        [context.getHandler(), context.getClass()],
      );
      if (isPublic) {
        return true;
      }

      const decodedUser: ValidateTokenResponse = await firstValueFrom(
        this.authServices.validateUserToken({
          token,
        }),
      );

      if (!decodedUser || !decodedUser.user) {
        return false;
      }

      request.user = decodedUser.user;

      return true;
    } catch (err) {
      console.log({ err });
      return false;
    }
  }
}
