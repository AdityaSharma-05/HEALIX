import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished(citySlug?: string) {
    return this.prisma.clinic.findMany({
      where: {
        isPublished: true,
        verificationStatus: "VERIFIED",
        ...(citySlug ? { city: { slug: citySlug } } : {})
      },
      include: {
        city: true,
        specialties: { include: { specialty: true } },
        doctors: {
          where: { isPublished: true, verificationStatus: "VERIFIED" },
          include: { specialties: { include: { specialty: true } } }
        }
      },
      orderBy: { name: "asc" }
    });
  }
}
