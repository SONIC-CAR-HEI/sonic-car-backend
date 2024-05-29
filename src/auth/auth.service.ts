import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { CryptoService } from "../crypto/crypto.service";
import * as process from "node:process";
import { LoginPayloadDto } from "./dto/login-payload.dto";

@Injectable()
export class AuthService {
    private readonly log = new Logger("AuthService");

    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
        private readonly cryptoService: CryptoService,
    ) {}

    async validateUser(email: string, password: string) {
        const adminQueried = await this.adminService.findByEmail(email);

        if (!adminQueried) {
            throw new UnauthorizedException(
                "No account associated with this email!",
            );
        }

        this.log.log(`User with email ${email} found`);

        if (process.env.PROD) {
            this.log.log("Running user validation in production mode");
        }

        const isMatch = await this.cryptoService.isMatch(
            password,
            adminQueried.password,
        );

        this.log.debug(`Valid given password ${isMatch}`);

        if (!isMatch) {
            throw new UnauthorizedException("Incorrect password!");
        }

        return adminQueried;
    }

    async login(
        loginPayload: LoginPayloadDto,
    ): Promise<{ token: string }> | null {
        const admin = await this.adminService.findByEmail(loginPayload.email);
        const payload = {
            sub: admin.id,
            email: admin.email,
        };

        return {
            token: await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
            }),
        };
    }
}
