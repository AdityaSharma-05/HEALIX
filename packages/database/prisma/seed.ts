import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const specialties = [
  {
    name: "General Physician",
    slug: "general-physician",
    description: "Primary care for common health concerns and routine consultations."
  },
  {
    name: "Dentist",
    slug: "dentist",
    description: "Dental consultations, preventive care, and oral health services."
  },
  {
    name: "Dermatologist",
    slug: "dermatologist",
    description: "Care for skin, hair, and nail concerns."
  },
  {
    name: "Pediatrician",
    slug: "pediatrician",
    description: "Healthcare for infants, children, and adolescents."
  }
];

async function main() {
  const moradabad = await prisma.city.upsert({
    where: { slug: "moradabad" },
    update: { name: "Moradabad", state: "Uttar Pradesh" },
    create: {
      name: "Moradabad",
      state: "Uttar Pradesh",
      country: "India",
      slug: "moradabad"
    }
  });

  for (const specialty of specialties) {
    await prisma.specialty.upsert({
      where: { slug: specialty.slug },
      update: specialty,
      create: specialty
    });
  }

  const generalPhysician = await prisma.specialty.findUniqueOrThrow({
    where: { slug: "general-physician" }
  });

  const demoClinic = await prisma.clinic.upsert({
    where: {
      cityId_slug: {
        cityId: moradabad.id,
        slug: "healix-demo-clinic"
      }
    },
    update: {},
    create: {
      cityId: moradabad.id,
      name: "Healix Demo Clinic",
      slug: "healix-demo-clinic",
      description: "Development-only sample clinic for testing the marketplace workflow.",
      address: "Moradabad, Uttar Pradesh",
      locality: "Moradabad",
      verificationStatus: "VERIFIED",
      isPublished: true
    }
  });

  await prisma.clinicSpecialty.upsert({
    where: {
      clinicId_specialtyId: {
        clinicId: demoClinic.id,
        specialtyId: generalPhysician.id
      }
    },
    update: {},
    create: {
      clinicId: demoClinic.id,
      specialtyId: generalPhysician.id
    }
  });

  console.log(`Seeded city, specialties, and demo clinic for ${moradabad.name}.`);
}

main()
  .catch((error) => {
    console.error("Database seed failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
