import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    Logger,
    UseGuards,
} from "@nestjs/common";
import { CarTypeService } from "./car-type.service";
import { CreateCarTypeDto } from "./dto/create-car-type.dto";
import { UpdateCarTypeDto } from "./dto/update-car-type.dto";
import { CarType } from "./entities/car-type.entity";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("car-type")
export class CarTypeController {
    private readonly log = new Logger(CarType.name);
    constructor(private readonly carTypeService: CarTypeService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createCarTypeDto: CreateCarTypeDto) {
        return this.carTypeService.create(createCarTypeDto);
    }

    @Get()
    findAll() {
        return this.carTypeService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("ids")
    findManyIds(@Query("ids") ids: string[]) {
        return this.carTypeService.findManyIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("ids")
    deleteManyIds(@Query("ids") ids: string[]) {
        return this.carTypeService.removeManyIds(ids);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.carTypeService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateCarTypeDto: UpdateCarTypeDto,
    ) {
        return this.carTypeService.update(id, updateCarTypeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.carTypeService.remove(id);
    }
}
