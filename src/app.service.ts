import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks,
  ) {}
  getHello(): string {
    return `Hello World! ${this.apiKey}`;
  }
}
