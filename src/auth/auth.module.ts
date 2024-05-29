import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminModule } from "../admin/admin.module";
import { JwtModule } from "@nestjs/jwt";
import { CryptoModule } from "../crypto/crypto.module";
import { AuthController } from "./auth.controller";
import { JwtStrategy, LocalStrategy, SupabaseStrategy } from "./auth.strategy";

@Module({
    imports: [
        AdminModule,
        JwtModule.register({
            global: true,
            signOptions: {
                expiresIn: "30d",
            },
        }),
        CryptoModule,
    ],
    providers: [AuthService, SupabaseStrategy, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [SupabaseStrategy],
})
export class AuthModule {}
