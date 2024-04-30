import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks,
    private config: ConfigService,
  ) {}
  getHello(): string {
    const apiKey = this.config.get('API_KEY');
    const db = this.config.get('DATABASE_NAME');
    return `Hello World! ${apiKey} ${db}`;
  }
}
