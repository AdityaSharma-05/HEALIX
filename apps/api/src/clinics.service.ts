import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class ClinicsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished(citySlug?: string, query?: string, specialtySlug?: string) {
    const normalizedQuery = query?.trim();

    return this.prisma.clinic.findMany({
      where: {
        isPublished: true,
        verificationStatus: "VERIFIED",
        ...(citySlug ? { city: { slug: citySlug } } : {}),
        ...(specialtySlug
          ? { specialties: { some: { specialty: { slug: specialtySlug } } } }
          : {}),
        ...(normalizedQuery
          ? {
              OR: [
                { name: { contains: normalizedQuery, mode: "insensitive" } },
                { address: { contains: normalizedQuery, mode: "insensitive" } },
                { locality: { contains: normalizedQuery, mode: "insensitive" } },
                {
                  specialties: {
                    some: {
                      specialty: {
                        name: { contains: normalizedQuery, mode: "insensitive" }
                      }
                    }
                  }
                },
                {
                  doctors: {
                    some: {
                      name: { contains: normalizedQuery, mode: "insensitive" }
                    }
                  }
                }
              ]
            }
          : {})
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
