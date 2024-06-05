import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { CarModule } from "./car/car.module";
import { AppointmentModule } from "./appointment/appointment.module";
import { AdminModule } from "./admin/admin.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CarTypeModule } from "./car-type/car-type.module";
import { CarImageModule } from "./car-image/car-image.module";
import { BrandModule } from "./brand/brand.module";
import * as Joi from "joi";
import { ContactModule } from "./contact/contact.module";

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
                CAR_IMAGE_BUCKET_NAME: Joi.string().required(),
                BUCKET_URL: Joi.string().required(),
            }),
            expandVariables: true,
        }),
        CarModule,
        AppointmentModule,
        AdminModule,
        AuthModule,
        CarTypeModule,
        CarImageModule,
        BrandModule,
        ContactModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
