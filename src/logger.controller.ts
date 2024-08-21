import { Controller, Get } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Controller('logs')
export class LoggerController {
  private logger = new Logger('LoggerController');

  @Get()
  getLogs(): string[] {
    const logs = this.logger.getRawMessages();
    return logs;
  }
}