export type CreateClinicRequest = {
  citySlug?: string;
  name?: string;
  address?: string;
  locality?: string;
  phone?: string;
  email?: string;
  description?: string;
  specialtySlugs?: string[];
};

export type ReviewClinicRequest = {
  status?: "VERIFIED" | "REJECTED" | "SUSPENDED";
  notes?: string;
};
