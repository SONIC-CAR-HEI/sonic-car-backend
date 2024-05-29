import { Injectable, Logger } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy as JwtAuthStrategy } from "passport-jwt";
import { SupabaseAuthStrategy } from "nestjs-supabase-auth";
import { Request } from "express";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import * as process from "node:process";

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
    SupabaseAuthStrategy,
    "supabase",
) {
    public constructor() {
        super({
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_KEY,
            supabaseJwtSecret: process.env.JWT_SECRET,
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: any): Promise<any> {
        super.validate(payload);
    }

    authenticate(req: Request) {
        super.authenticate(req);
    }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
    private readonly log = new Logger(LocalStrategy.name);
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: "email",
        });
    }

    async validate(email: string, password: string): Promise<any> {
        this.log.debug(`Incoming login request from ${email}`);
        return await this.authService.validateUser(email, password);
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(JwtAuthStrategy, "jwt") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}
