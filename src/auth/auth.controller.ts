import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard, LocalAuthGuard } from "./auth.guard";
import { AuthenticatedRequest } from "../utils/object.utils";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("whoami")
    whoami(@Request() req: AuthenticatedRequest) {
        return this.authService.getIdentity(req);
    }
}
