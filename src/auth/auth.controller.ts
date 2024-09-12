import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { CreateUserDto } from './auth.user.dto'; // Correct import for user creation
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: Object })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createUserDto);
  }
}
