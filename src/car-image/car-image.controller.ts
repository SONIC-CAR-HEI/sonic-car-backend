import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Logger,
    Query,
    UseGuards,
} from "@nestjs/common";
import { CarImageService } from "./car-image.service";
import { UpdateCarImageDto } from "./dto/update-car-image.dto";
import { StorageService } from "../storage/storage.service";
import { JwtAuthGuard } from "../auth/auth.guard";
import { CreateCarImageDto } from "./dto/create-car-image.dto";

@Controller("car-image")
export class CarImageController {
    private readonly logger = new Logger(CarImageController.name);
    constructor(
        private readonly carImageService: CarImageService,
        private readonly storageService: StorageService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get("ids")
    findManyByIds(@Query("ids") ids: string[]) {
        return this.carImageService.findManyIds(ids);
    }

    @Get("object/:id")
    findImageById(@Param("id") id: string) {
        return this.carImageService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("ids")
    removeManyIds(@Query("ids") ids: string[]) {
        return this.carImageService.deleteManyIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createNormal(@Body() create: CreateCarImageDto) {
        return this.carImageService.create(create);
    }

    @Get()
    findAll() {
        return this.carImageService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateCarImageDto: UpdateCarImageDto,
    ) {
        return this.carImageService.update(id, updateCarImageDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.carImageService.remove(id);
    }

    @Get(":carId")
    getCarImages(@Param("carId") carId: string) {
        return this.carImageService.findByCarId(carId);
    }
}
