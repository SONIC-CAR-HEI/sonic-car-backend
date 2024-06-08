import { Module } from "@nestjs/common";
import { CarService } from "./car.service";
import { CarController } from "./car.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { SupabaseClientService } from "../supabase-client/supabase-client.service";
import { CarImageModule } from "../car-image/car-image.module";

@Module({
    imports: [PrismaModule, CarImageModule],
    controllers: [CarController],
    providers: [CarService, SupabaseClientService],
})
export class CarModule {}
