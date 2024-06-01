import { forwardRef, Module } from "@nestjs/common";
import { CarImageService } from "./car-image.service";
import { CarImageController } from "./car-image.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { StorageModule } from "../storage/storage.module";

@Module({
    imports: [PrismaModule, forwardRef(() => StorageModule)],
    controllers: [CarImageController],
    providers: [CarImageService],
    exports: [CarImageService],
})
export class CarImageModule {}
