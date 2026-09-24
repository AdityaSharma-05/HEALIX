import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { jwtVerify, JWTPayload } from "jose";
import { Request } from "express";
import { AuthenticatedUser, AppRole } from "./auth.types";
import { ROLES_KEY } from "./auth.decorator";

type AuthenticatedRequest = Request & { user?: AuthenticatedUser };

function getRole(payload: JWTPayload): AppRole {
  const metadata = payload.app_metadata as { role?: string } | undefined;
  const userMetadata = payload.user_metadata as { role?: string } | undefined;
  const role = metadata?.role ?? userMetadata?.role;
  const allowedRoles: AppRole[] = [
    "PATIENT",
    "CLINIC_OWNER",
    "CLINIC_STAFF",
    "ADMIN"
  ];

  if (!role || !allowedRoles.includes(role as AppRole)) {
    throw new UnauthorizedException("A valid Healix role is required.");
  }

  return role as AppRole;
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.headers.authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
    const secret = process.env.SUPABASE_JWT_SECRET;

    if (!token || !secret) {
      throw new UnauthorizedException("A Bearer access token is required.");
    }

    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret),
        { algorithms: ["HS256"] }
      );

      if (!payload.sub) {
        throw new UnauthorizedException("The access token has no subject.");
      }

      request.user = {
        id: payload.sub,
        role: getRole(payload),
        email: typeof payload.email === "string" ? payload.email : undefined
      };
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException("The access token is invalid or expired.");
    }
  }
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<AppRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request.user || !requiredRoles.includes(request.user.role)) {
      throw new UnauthorizedException("You do not have permission for this action.");
    }
    return true;
  }
}
