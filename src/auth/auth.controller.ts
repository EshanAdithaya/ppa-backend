import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { CreateUserDto } from './auth.user.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { EmailSenderService } from '../EmailSender/email-sender.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly emailSenderService: EmailSenderService,
  ) {}

  // Login endpoint
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful', type: Object })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  // Signup endpoint
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

  // Password reset request endpoint
  @Post('password-reset-request')
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset OTP sent' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ schema: { properties: { email: { type: 'string' } } } })
  async requestPasswordReset(@Body('email') email: string) {
    const { otp, expiresAt } = await this.authService.generatePasswordResetOTP(email);
    
    await this.emailSenderService.sendEmail(
      email,
      'Password Reset OTP',
      `Your OTP for password reset is: ${otp}. It will expire in 10 minutes (at ${expiresAt.toISOString()}).`
    );

    return { message: 'Password reset OTP sent to your email' };
  }

  // OTP verification endpoint
  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify OTP for password reset' })
  @ApiResponse({ status: 200, description: 'OTP verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, otp: { type: 'string' } } } })
  async verifyOTP(@Body() body: { email: string; otp: string }) {
    const isValid = await this.authService.verifyPasswordResetOTP(body.email, body.otp);
    if (!isValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }
    return { message: 'OTP verified successfully' };
  }

  // Password reset endpoint
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password after OTP verification' })
  @ApiResponse({ status: 200, description: 'Password reset successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiBody({ schema: { properties: { email: { type: 'string' }, otp: { type: 'string' }, newPassword: { type: 'string' } } } })
  async resetPassword(@Body() body: { email: string; otp: string; newPassword: string }) {
    await this.authService.resetPassword(body.email, body.otp, body.newPassword);
    return { message: 'Password reset successfully' };
  }

  // Verify user authentication and get user info
  @Get('verify')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Verify user authentication and get user info' })
  @ApiResponse({ status: 200, description: 'User is authenticated', type: Object })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async verifyAuth(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as any;

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid token');
    }

    const now = Math.floor(Date.now() / 1000);
    const exp = decodedToken.exp;
    const remainingTime = exp - now;

    if (remainingTime <= 0) {
      throw new UnauthorizedException('Token has expired');
    }

    const user = await this.authService.findUserById(decodedToken.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      isAuthenticated: true,
      userId: user.UserID,
      email: user.Email,
      role: user.Role,
      remainingTime,
      lastAccessTime: user.LatestAccessTime,
    };
  }

  // Check remaining live time of the token
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

  // Extend bearer token live time by 1 hour
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
