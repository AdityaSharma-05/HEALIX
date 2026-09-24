export type AppRole = "PATIENT" | "CLINIC_OWNER" | "CLINIC_STAFF" | "ADMIN";

export type AuthenticatedUser = {
  id: string;
  role: AppRole;
  email?: string;
};
