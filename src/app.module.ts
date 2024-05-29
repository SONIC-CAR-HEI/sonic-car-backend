import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { CarModule } from "./car/car.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { AdminModule } from "./admin/admin.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import * as Joi from "joi";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                SUPABASE_URL: Joi.string(),
                SUPABASE_KEY: Joi.string(),
                PROD: Joi.boolean(),
            }),
        }),
        CarModule,
        AppointmentModule,
        AdminModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
