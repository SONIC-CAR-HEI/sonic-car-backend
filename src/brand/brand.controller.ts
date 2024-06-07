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
} from "@nestjs/common";
import { BrandService } from "./brand.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("brand")
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @UseGuards(JwtAuthGuard)
    @Get("ids")
    findManyIds(@Query("ids") ids: string[]) {
        return this.brandService.findManyIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("ids")
    deleteManyIds(@Query("ids") ids: string[]) {
        return this.brandService.removeManyIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBrandDto: CreateBrandDto) {
        return this.brandService.create(createBrandDto);
    }

    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.brandService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateBrandDto: UpdateBrandDto) {
        return this.brandService.update(id, updateBrandDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.brandService.remove(id);
    }
}
