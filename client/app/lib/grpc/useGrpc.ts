import { AuthService } from "./grpcClient";
import { promisify } from "util";
import * as grpc from "@grpc/grpc-js";

const target = "localhost:5000";

export class GrpcService extends AuthService {
  constructor() {
    super(target, grpc.credentials.createInsecure());
  }

  public async verify(token: string) {
    const validateToken = promisify(this.validateUserToken).bind(this);
    return await validateToken({ token })
      .then((user) => ({ user, error: null }))
      .catch((error) => ({ error, client: null }));
  }
}
