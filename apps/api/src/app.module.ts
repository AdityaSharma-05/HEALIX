import { Module } from "@nestjs/common";
import { ClinicsController } from "./clinics.controller";
import { ClinicsService } from "./clinics.service";
import { AuthController } from "./auth.controller";
import { RolesGuard, SupabaseAuthGuard } from "./auth.guard";
import { HealthController } from "./health.controller";
import { PrismaService } from "./prisma.service";
import { Reflector } from "@nestjs/core";
import { SpecialtiesController } from "./specialties.controller";
import { SpecialtiesService } from "./specialties.service";

@Module({
  controllers: [
    AuthController,
    HealthController,
    ClinicsController,
    SpecialtiesController
  ],
  providers: [
    ClinicsService,
    SpecialtiesService,
    PrismaService,
    Reflector,
    SupabaseAuthGuard,
    RolesGuard
  ]
})
export class AppModule {}
