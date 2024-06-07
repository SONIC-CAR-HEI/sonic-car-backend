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
import { AppointmentService } from "./appointment.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { AppointmentStatus } from "@prisma/client";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("appointment")
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Post()
    create(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.appointmentService.create(createAppointmentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.appointmentService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.appointmentService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
        return this.appointmentService.update(id, updateAppointmentDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.appointmentService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(":id")
    updateStatus(
        @Param("id") id: string,
        @Query("status") status: AppointmentStatus,
    ) {
        return this.appointmentService.changeAppointmentStatus(id, status);
    }
}
