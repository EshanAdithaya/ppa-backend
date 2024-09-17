import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { CreateUserDto } from './auth.user.dto'; // Correct import for user creation
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, // JwtService added for token manipulation
  ) {}

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

  // New endpoint: Check bearer token live time
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('token/check-live-time')
  @ApiOperation({ summary: 'Check remaining live time of the bearer token' })
  @ApiResponse({
    status: 200,
    description: 'Returns remaining time in seconds.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token invalid or expired.',
  })
  checkTokenLiveTime(@Req() req): any {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as any;

    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const exp = decodedToken.exp; // token expiration time
    const remainingTime = exp - now;

    if (remainingTime > 0) {
      return { remainingTime };
    } else {
      return { message: 'Token has expired' };
    }
  }

  // New endpoint: Extend bearer token live time by 1 hour
  @Post('token/extend-live-time')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Extend bearer token live time by 1 hour' })
  @ApiResponse({
    status: 200,
    description: 'Bearer token expiration extended by 1 hour.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Token invalid or expired.',
  })
  extendTokenLiveTime(@Req() req): any {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as any;
  
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const exp = decodedToken.exp; // current expiration time
    const remainingTime = exp - now;
  
    // If token is valid, extend by 1 hour
    if (remainingTime > 0) {
      // Remove the `exp` field before signing a new token
      const { exp, iat, ...restOfPayload } = decodedToken;
  
      // Sign a new token without `exp` in the payload
      const extendedToken = this.jwtService.sign(
        { ...restOfPayload }, // Pass only the rest of the payload, without `exp`
        { expiresIn: '1h' }   // Set the new expiration time to 1 hour
      );
  
      return { extendedToken, newExpirationTime: exp + 3600 };
    } else {
      return { message: 'Token has already expired, cannot extend.' };
    }
  }  
}
