// src/users/dto/user.dto.ts
export class CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export class LoginDto {
  email: string;
  password: string;
}
