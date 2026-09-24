import { Controller, Get, Query } from "@nestjs/common";
import { ClinicsService } from "./clinics.service";

@Controller("clinics")
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  findPublished(@Query("city") citySlug?: string) {
    return this.clinicsService.findPublished(citySlug);
  }
}
