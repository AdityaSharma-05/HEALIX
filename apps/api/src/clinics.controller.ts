import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from "@nestjs/common";
import { Roles } from "./auth.decorator";
import { RolesGuard, SupabaseAuthGuard } from "./auth.guard";
import { CreateClinicRequest, ReviewClinicRequest } from "./clinics.dto";
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

  @Post("onboarding")
  submitForVerification(@Body() request: CreateClinicRequest) {
    return this.clinicsService.submitForVerification(request);
  }

  @Post(":clinicId/review")
  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles("ADMIN")
  reviewClinic(
    @Param("clinicId") clinicId: string,
    @Body() request: ReviewClinicRequest
  ) {
    return this.clinicsService.reviewClinic(clinicId, request);
  }
}
