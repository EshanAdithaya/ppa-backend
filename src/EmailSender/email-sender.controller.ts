import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { EmailSenderService } from './email-sender.service';

export class SendEmailDto {
  @ApiProperty({ example: 'user@example.com', description: 'Recipient email address' })
  email: string;

  @ApiProperty({ example: 'Account Created', description: 'Email subject' })
  subject: string;

  @ApiProperty({
    example: '<h1>Your account has been created!</h1>',
    description: 'HTML email content'
  })
  message: string;
}

@ApiTags('email')
@Controller('email')
export class EmailSenderController {
  constructor(private readonly emailSenderService: EmailSenderService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send an HTML email' })
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
