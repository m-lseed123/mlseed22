import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./pb/generated/auth";
import path from "path";

const PROTO_PATH = path.join(process.cwd(), "./auth.proto");

// suggested options for similarity to loading grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  defaults: true,
  oneofs: true,
});

const verifyService = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).auth;

export const { AuthService } = verifyService;
