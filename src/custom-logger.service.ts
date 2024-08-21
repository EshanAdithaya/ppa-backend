import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends Logger {
  private logs: string[] = [];

  log(message: string) {
    super.log(message);
    this.logs.push(message);
  }

  getLogs(): string[] {
    return this.logs;
  }
}
