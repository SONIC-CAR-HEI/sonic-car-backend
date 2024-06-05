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
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { SearchParamDto } from "./dto/search-param.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Controller("car")
export class CarController {
    constructor(private readonly carService: CarService) {}

    @Get("search")
    search(@Query() query: SearchParamDto) {
        return this.carService.performSearch(query);
    }

    @Post()
    create(@Body() createCarDto: CreateCarDto) {
        return this.carService.create(createCarDto);
    }

    @Get()
    findAll() {
        return this.carService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.carService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
        return this.carService.update(id, updateCarDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.carService.remove(id);
    }
}
