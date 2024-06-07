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
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { SearchParamDto } from "./dto/search-param.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("car")
export class CarController {
    constructor(private readonly carService: CarService) {}

    @UseGuards(JwtAuthGuard)
    @Delete("ids")
    deleteManyIds(@Query("ids") ids: string[]) {
        return this.carService.removeMayIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Get("ids")
    findManyIds(@Query("ids") ids: string[]) {
        return this.carService.findManyIds(ids);
    }

    @Get("search")
    search(@Query() query: SearchParamDto) {
        return this.carService.performSearch(query);
    }

    @Get("fav")
    favorites() {
        return this.carService.findFavorites();
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
        return this.carService.update(id, updateCarDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.carService.remove(id);
    }
}
