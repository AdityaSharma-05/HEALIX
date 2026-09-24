import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UnauthorizedException
} from "@nestjs/common";
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
  reviewClinic(
    @Param("clinicId") clinicId: string,
    @Body() request: ReviewClinicRequest,
    @Headers("x-admin-key") adminKey?: string
  ) {
    if (!process.env.ADMIN_API_KEY || adminKey !== process.env.ADMIN_API_KEY) {
      throw new UnauthorizedException("Admin authorization is required.");
    }
    return this.clinicsService.reviewClinic(clinicId, request);
  }
}
