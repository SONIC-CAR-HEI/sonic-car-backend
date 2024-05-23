import {
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from "@nestjs/common";
import { AdminService } from "../admin/admin.service";
import { JwtService } from "@nestjs/jwt";
import { CryptoService } from "../crypto/crypto.service";
import * as process from "node:process";

@Injectable()
export class AuthService {
    private readonly logger = new Logger("AuthService");

    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JwtService,
        private readonly cryptoService: CryptoService,
    ) {}

    async login(email: string, password: string): Promise<{ token: string }> {
        const adminQueried = await this.adminService.findByEmail(email);

        if (!adminQueried) {
            throw new UnauthorizedException(
                "No account associated with this email!",
            );
        }

        this.logger.log(`User with email ${email} found`);

        const isMatch = this.cryptoService.isMatch(
            password,
            adminQueried.password,
        );

        if (!isMatch) {
            throw new UnauthorizedException("Incorrect password!");
        }

        const payload = {
            sub: adminQueried.id,
            username: adminQueried.email,
        };

        return {
            token: await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET as string,
            }),
        };
    }

    async isAuthenticated(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException("Missing or invalid token");
        }

        try {
            await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET as string,
            });
        } catch {
            throw new UnauthorizedException("Invalid token");
        }

        return true;
    }

    private extractTokenFromHeader(request: {
        headers: { authorization: string };
    }): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
