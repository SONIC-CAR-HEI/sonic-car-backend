import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginPayloadDto } from "./dto/login-payload.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    login(@Body() loginPayload: LoginPayloadDto) {
        return this.authService.login(loginPayload);
    }
}
