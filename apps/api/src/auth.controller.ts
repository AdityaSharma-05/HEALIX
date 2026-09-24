import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { SupabaseAuthGuard } from "./auth.guard";
import { AuthenticatedUser } from "./auth.types";

type AuthenticatedRequest = Request & { user: AuthenticatedUser };

@Controller("auth")
export class AuthController {
  @Get("me")
  @UseGuards(SupabaseAuthGuard)
  getCurrentUser(@Req() request: AuthenticatedRequest) {
    return {
      user: request.user
    };
  }
}
