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

    @Post()
    create(@Body() createAdminDto: CreateAdminDto) {
        return this.adminService.create(createAdminDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.adminService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.adminService.findOne(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateAdminDto: UpdateAdminDto) {
        return this.adminService.update(id, updateAdminDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.adminService.remove(id);
    }

    @Get("ids")
    findManyIds(@Query("ids") ids: string[]) {
        return this.adminService.findManyIds(ids);
    }

    @Delete("ids")
    deleteManyIds() {
        throw new UnauthorizedException("You must remove id");
    }
}
