import { Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('api/events')
export class CatalogController {
  constructor(private catalogService: CatalogService) {}

  @Get()
  async getAllEvents(@Query() query: any) {
    return this.catalogService.getAllEvents(query);
  }
}
