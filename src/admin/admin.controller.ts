import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    UnauthorizedException,
} from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @UseGuards(JwtAuthGuard)
    @Get("ids")
    findManyIds(@Query("ids") ids: string[]) {
        return this.adminService.findManyIds(ids);
    }

    @UseGuards(JwtAuthGuard)
    @Delete("ids")
    deleteManyIds() {
        throw new UnauthorizedException("You must remove id");
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.create(createAdminDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.adminService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
        return this.adminService.update(id, updateAdminDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.adminService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.adminService.findAll();
    }
}
