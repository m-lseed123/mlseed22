// Original file: app/lib/grpc/pb/auth.proto

import type { DecodedUserResponse as _auth_DecodedUserResponse, DecodedUserResponse__Output as _auth_DecodedUserResponse__Output } from '../auth/DecodedUserResponse';
import type { Empty as _auth_Empty, Empty__Output as _auth_Empty__Output } from '../auth/Empty';

export interface ValidateTokenResponse {
  'user'?: (_auth_DecodedUserResponse | null);
  'empty'?: (_auth_Empty | null);
  'response'?: "user"|"empty";
}

export interface ValidateTokenResponse__Output {
  'user'?: (_auth_DecodedUserResponse__Output | null);
  'empty'?: (_auth_Empty__Output | null);
  'response': "user"|"empty";
}
