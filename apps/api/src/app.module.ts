import { Module } from "@nestjs/common";
import { ClinicsController } from "./clinics.controller";
import { ClinicsService } from "./clinics.service";
import { HealthController } from "./health.controller";
import { PrismaService } from "./prisma.service";
import { Reflector } from "@nestjs/core";
import { SpecialtiesController } from "./specialties.controller";
import { SpecialtiesService } from "./specialties.service";

@Module({
  controllers: [
    HealthController,
    ClinicsController,
    SpecialtiesController
  ],
  providers: [
    ClinicsService,
    SpecialtiesService,
    PrismaService,
    Reflector
  ]
})
export class AppModule {}
