import { Controller, Get } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';

@Controller('logs')
export class LoggerController {
  constructor(private readonly customLoggerService: CustomLoggerService) {}

  @Get()
  getLogs(): string[] {
    return this.customLoggerService.getLogs();
  }
}
