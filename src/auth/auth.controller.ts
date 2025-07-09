import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { login: string; password: string }) {
    const { login, password } = body;
    console.log('Login attempt:', login, 'Password:', password);
    const user = await this.authService.validateUser(login, password);
    if (!user) {
      console.error('Invalid credentials for user:', login);
      throw new Error('Неверный логин или пароль');
    }
    console.log('User validated successfully:', user);
    return this.authService.login({
      id: Number(user.id),
      role: String(user.role),
    });
  }
}
