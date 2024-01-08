import { Controller, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exception.fitler';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}
}
