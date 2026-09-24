import {
  BadRequestException,
  Injectable,
  NotFoundException
} from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateClinicRequest, ReviewClinicRequest } from "./clinics.dto";

const validReviewStatuses = new Set(["VERIFIED", "REJECTED", "SUSPENDED"]);

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

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

  async submitForVerification(request: CreateClinicRequest) {
    if (!request.name?.trim() || !request.address?.trim()) {
      throw new BadRequestException("Clinic name and address are required.");
    }

    const city = await this.prisma.city.findUnique({
      where: { slug: request.citySlug?.trim() || "moradabad" }
    });
    if (!city) {
      throw new BadRequestException("The selected city does not exist.");
    }

    const specialtySlugs = [...new Set(request.specialtySlugs ?? [])];
    const specialties = await this.prisma.specialty.findMany({
      where: { slug: { in: specialtySlugs } }
    });
    if (specialtySlugs.length !== specialties.length) {
      throw new BadRequestException("One or more specialties do not exist.");
    }

    const slug = slugify(request.name);
    const existing = await this.prisma.clinic.findUnique({
      where: { cityId_slug: { cityId: city.id, slug } }
    });
    if (existing) {
      throw new BadRequestException(
        "A clinic with this name already exists in this city."
      );
    }

    return this.prisma.clinic.create({
      data: {
        cityId: city.id,
        name: request.name.trim(),
        slug,
        address: request.address.trim(),
        locality: request.locality?.trim(),
        phone: request.phone?.trim(),
        email: request.email?.trim(),
        description: request.description?.trim(),
        verificationStatus: "PENDING_REVIEW",
        isPublished: false,
        specialties: {
          create: specialties.map((specialty) => ({
            specialtyId: specialty.id
          }))
        },
        verifications: {
          create: { status: "PENDING_REVIEW" }
        }
      },
      include: { city: true, specialties: { include: { specialty: true } } }
    });
  }

  async reviewClinic(clinicId: string, request: ReviewClinicRequest) {
    if (!validReviewStatuses.has(request.status ?? "")) {
      throw new BadRequestException(
        "Review status must be VERIFIED, REJECTED, or SUSPENDED."
      );
    }

    const clinic = await this.prisma.clinic.findUnique({
      where: { id: clinicId }
    });
    if (!clinic) {
      throw new NotFoundException("Clinic not found.");
    }

    const status = request.status!;
    return this.prisma.$transaction(async (transaction) => {
      await transaction.clinicVerification.create({
        data: {
          clinicId,
          status,
          notes: request.notes?.trim(),
          reviewedAt: new Date()
        }
      });

      return transaction.clinic.update({
        where: { id: clinicId },
        data: {
          verificationStatus: status,
          isPublished: status === "VERIFIED"
        },
        include: { city: true, specialties: { include: { specialty: true } } }
      });
    });
  }
}
