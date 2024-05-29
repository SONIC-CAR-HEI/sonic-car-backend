import { Module } from "@nestjs/common";
import { CarTypeService } from "./car-type.service";
import { CarTypeController } from "./car-type.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    controllers: [CarTypeController],
    providers: [CarTypeService],
})
export class CarTypeModule {}
