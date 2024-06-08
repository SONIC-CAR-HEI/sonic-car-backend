import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Logger,
} from "@nestjs/common";
import { CarService } from "./car.service";
import { CreateCarDto } from "./dto/create-car.dto";
import { SearchParamDto } from "./dto/search-param.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { JwtAuthGuard } from "../auth/auth.guard";
import { SupabaseClientService } from "../supabase-client/supabase-client.service";
import { CarImageService } from "../car-image/car-image.service";

@Controller("car")
export class CarController {
    private readonly logger = new Logger(CarController.name);
    constructor(
        private readonly carService: CarService,
        private readonly supabaseClientService: SupabaseClientService,
        private readonly carImageService: CarImageService,
    ) {}

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
    async create(@Body() createCarDto: CreateCarDto) {
        return await this.carService.create(createCarDto);
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
    async update(@Param("id") id: string, @Body() updateCarDto: UpdateCarDto) {
        return await this.carService.update(id, updateCarDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.carService.remove(id);
    }
}
