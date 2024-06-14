export class UserCreatedDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
