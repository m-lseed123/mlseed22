import {
  AuthServiceController,
  AuthServiceControllerMethods,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@app/grpc/proto/auth';
import { AuthService } from '../services/auth.service';
import { Controller, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
@Controller()
@AuthServiceControllerMethods()
export class AuthGrpcController implements AuthServiceController {
  constructor(private readonly authService: AuthService) {}

  validateUserToken(
    request: ValidateTokenRequest,
  ):
    | ValidateTokenResponse
    | Observable<ValidateTokenResponse>
    | Promise<ValidateTokenResponse> {
    return this.authService.validateUserToken(request.token);
  }
}
