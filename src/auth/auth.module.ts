import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AdminModule } from "../admin/admin.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "node:process";
import { CryptoModule } from "../crypto/crypto.module";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        AdminModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET as string,
            signOptions: {
                expiresIn: "30d",
            },
        }),
        CryptoModule,
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
