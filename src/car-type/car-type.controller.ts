import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from "@nestjs/common";
import { CarTypeService } from "./car-type.service";
import { CreateCarTypeDto } from "./dto/create-car-type.dto";
import { UpdateCarTypeDto } from "./dto/update-car-type.dto";

@Controller("car-type")
export class CarTypeController {
    constructor(private readonly carTypeService: CarTypeService) {}

    @Post()
    create(@Body() createCarTypeDto: CreateCarTypeDto) {
        return this.carTypeService.create(createCarTypeDto);
    }

    @Get()
    findAll() {
        return this.carTypeService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.carTypeService.findOne(id);
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateCarTypeDto: UpdateCarTypeDto,
    ) {
        return this.carTypeService.update(id, updateCarTypeDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.carTypeService.remove(id);
    }

    @Get("ids")
    findManyIds(@Query("ids") ids: string[]) {
        return this.carTypeService.findManyIds(ids);
    }

    @Delete("ids")
    deleteManyIds(@Query("ids") ids: string[]) {
        return this.carTypeService.removeManyIds(ids);
    }
}
