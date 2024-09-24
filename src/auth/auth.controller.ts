// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('Login request received:', loginDto);

    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    console.log(user);


    return this.authService.login(user); // Moved JWT logic to the AuthService
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    // Create the user using the UserService
    const user = await this.userService.create(createUserDto);

    // Return the JWT token for the newly created user
    return this.authService.login(user);
  }
}
