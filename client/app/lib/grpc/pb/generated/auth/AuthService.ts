// Original file: app/lib/grpc/pb/auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ValidateTokenRequest as _auth_ValidateTokenRequest, ValidateTokenRequest__Output as _auth_ValidateTokenRequest__Output } from '../auth/ValidateTokenRequest';
import type { ValidateTokenResponse as _auth_ValidateTokenResponse, ValidateTokenResponse__Output as _auth_ValidateTokenResponse__Output } from '../auth/ValidateTokenResponse';

export interface AuthServiceClient extends grpc.Client {
  ValidateUserToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateUserToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateUserToken(argument: _auth_ValidateTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  ValidateUserToken(argument: _auth_ValidateTokenRequest, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateUserToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateUserToken(argument: _auth_ValidateTokenRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateUserToken(argument: _auth_ValidateTokenRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  validateUserToken(argument: _auth_ValidateTokenRequest, callback: grpc.requestCallback<_auth_ValidateTokenResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  ValidateUserToken: grpc.handleUnaryCall<_auth_ValidateTokenRequest__Output, _auth_ValidateTokenResponse>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  ValidateUserToken: MethodDefinition<_auth_ValidateTokenRequest, _auth_ValidateTokenResponse, _auth_ValidateTokenRequest__Output, _auth_ValidateTokenResponse__Output>
}
