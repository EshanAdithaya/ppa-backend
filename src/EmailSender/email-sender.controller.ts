import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { EmailSenderService } from './email-sender.service';

class SendEmailDto {
  @ApiProperty({ example: 'user@example.com', description: 'Recipient email address' })
  email: string;

  @ApiProperty({ example: 'Account Created', description: 'Email subject' })
  subject: string;

  @ApiProperty({ example: 'Your account has been created successfully!', description: 'Email message' })
  message: string;
}

@ApiTags('email')
@Controller('email')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an email' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Failed to send email' })
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailSenderService.sendEmail(
      sendEmailDto.email,
      sendEmailDto.subject,
      sendEmailDto.message,
    );
  }
}
