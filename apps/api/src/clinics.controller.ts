import { Controller, Get, Query } from "@nestjs/common";
import { ClinicsService } from "./clinics.service";

@Controller("clinics")
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @Get()
  findPublished(
    @Query("city") citySlug?: string,
    @Query("q") query?: string,
    @Query("specialty") specialtySlug?: string
  ) {
    return this.clinicsService.findPublished(citySlug, query, specialtySlug);
  }
}
